package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.*;
import j2html.tags.ContainerTag;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.xhtmlrenderer.layout.SharedContext;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static j2html.TagCreator.*;
import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.summingInt;

@Service
public class ReportService {

    private final ItemService itemService;
    private final DeliveryService deliveryService;
    private final ShippingService shippingService;

    @Autowired
    public ReportService(ItemService itemService, DeliveryService deliveryService, ShippingService shippingService) {
        this.itemService = itemService;
        this.deliveryService = deliveryService;
        this.shippingService = shippingService;
    }

    public InputStreamResource getTransactionReport(long warehouseId) throws IOException {
        List<Delivery> deliveries = deliveryService.getAllByWarehouseId(warehouseId).stream()
                .filter(delivery -> delivery.getDeliveryDate().after(Date.from(Instant.now().minus(Duration.ofDays(30)))))
                .collect(Collectors.toList());
        List<Shipping> shippings = shippingService.getAllByWarehouseId(warehouseId).stream()
                .filter(order -> order.getOrderDate().after(Date.from(Instant.now().minus(Duration.ofDays(30)))))
                .collect(Collectors.toList());
        String html = generateHTMLTransactionReport(deliveries, shippings);
        Document document = getDocumentFromHTML(html);
        InputStream inputStream = getPDFInputStream(document);
        return new InputStreamResource(inputStream);
    }


    public InputStreamResource getInventoryReport(long warehouseId) throws IOException {
        List<ItemLocation> items = itemService.getItemLocationsByWarehouseId(warehouseId);
        String html = generateHTMLInventoryReport(items);
        Document document = getDocumentFromHTML(html);
        InputStream inputStream = getPDFInputStream(document);
        return new InputStreamResource(inputStream);
    }

    private String generateHTMLTransactionReport(List<Delivery> deliveries, List<Shipping> shippings) {
        Map<ItemDelivery, Integer> allDelivered = deliveries.stream()
                .flatMap(delivery -> delivery.getItems().stream())
                .map(itemDelivery -> {
                    ItemDelivery newItemDelivery = new ItemDelivery() {
                        @Override
                        public int hashCode() {
                            return this.getItem().getCode().hashCode();
                        }

                        @Override
                        public boolean equals(Object o) {
                            return this.getItem().getCode().equals(((ItemDelivery) o).getItem().getCode());
                        }
                    };
                    newItemDelivery.setItem(itemDelivery.getItem());
                    newItemDelivery.setQuantity(itemDelivery.getQuantity());
                    return newItemDelivery;
                })
                .collect(groupingBy(it -> it, summingInt(ItemDelivery::getQuantity)));

        Map<ItemShipping, Integer> allShipped = shippings.stream()
                .flatMap(shipping -> shipping.getItems().stream())
                .map(itemShipping -> {
                    ItemShipping newItemShipping = new ItemShipping() {
                        @Override
                        public int hashCode() {
                            return this.getItem().getCode().hashCode();
                        }

                        @Override
                        public boolean equals(Object o) {
                            return this.getItem().getCode().equals(((ItemShipping) o).getItem().getCode());
                        }
                    };
                    newItemShipping.setItem(itemShipping.getItem());
                    newItemShipping.setQuantity(itemShipping.getQuantity());
                    return newItemShipping;
                })
                .collect(groupingBy(it -> it, summingInt(ItemShipping::getQuantity)));

        return html(
                head(
                        title("Transaction Report"),
                        style("body {\n" +
                                "    text-align: center;\n" +
                                "}\n" +
                                "\n" +
                                "table {\n" +
                                "    width: 100%;\n" +
                                "}\n" +
                                "\n" +
                                "th, td {\n" +
                                "    border: black solid 1px;\n" +
                                "}\n")
                ),
                body(
                        h1("Transaction Report"),
                        br(),
                        h3("Incoming deliveries"),
                        table(
                                thead(
                                        th("Delivery ID"),
                                        th("Supplier"),
                                        th("Delivery Date"),
                                        th("Quantity of items"),
                                        th("Responsible employee"),
                                        th("Status")
                                ),
                                tbody(
                                        deliveries.stream()
                                                .map(delivery -> tr(
                                                        td(delivery.getId().toString()),
                                                        td(delivery.getSupplier().getName()),
                                                        td(delivery.getDeliveryDate().toString()),
                                                        td(String.valueOf(delivery.getItems().stream()
                                                                .mapToInt(ItemDelivery::getQuantity)
                                                                .sum())),
                                                        td(delivery.getEmployee().getName()),
                                                        td(delivery.getStatus())
                                                        ))
                                                .toArray(ContainerTag[]::new)
                                )
                        ),
                        br(),
                        h3("Outgoing shippings"),
                        table(
                                thead(
                                        th("Shipping ID"),
                                        th("Client"),
                                        th("Order Date"),
                                        th("Quantity of items"),
                                        th("Responsible employee"),
                                        th("Status")
                                ),
                                tbody(
                                        shippings.stream()
                                                .map(shipping -> tr(
                                                        td(shipping.getId().toString()),
                                                        td(shipping.getClient().getName()),
                                                        td(shipping.getOrderDate().toString()),
                                                        td(String.valueOf(shipping.getItems().stream()
                                                                .mapToInt(ItemShipping::getQuantity)
                                                                .sum())),
                                                        td(shipping.getEmployee().getName()),
                                                        td(shipping.getStatus())
                                                ))
                                                .toArray(ContainerTag[]::new)
                                )
                        ),
                        br(),
                        h3("All ingoing items"),
                        table(
                                thead(
                                        th("Item ID"),
                                        th("Item name"),
                                        th("Quantity")
                                ),
                                tbody(
                                        allDelivered.keySet().stream()
                                                .map(itemDelivery -> tr(
                                                        td(itemDelivery.getItem().getCode().toString()),
                                                        td(itemDelivery.getItem().getName()),
                                                        td(String.valueOf(allDelivered.get(itemDelivery)))
                                                ))
                                                .toArray(ContainerTag[]::new)
                                )
                        ),
                        br(),
                        h3("All outgoing items"),
                        table(
                                thead(
                                        th("Item ID"),
                                        th("Item name"),
                                        th("Quantity")
                                ),
                                tbody(
                                        allShipped.keySet().stream()
                                                .map(itemShipping -> tr(
                                                        td(itemShipping.getItem().getCode().toString()),
                                                        td(itemShipping.getItem().getName()),
                                                        td(String.valueOf(allShipped.get(itemShipping)))
                                                ))
                                                .toArray(ContainerTag[]::new)
                                )
                        )
                )
        ).render();
    }

    private String generateHTMLInventoryReport(List<ItemLocation> items) {
        return html(
                head(
                        title("Inventory Report"),
                        style("body {\n" +
                                "    text-align: center;\n" +
                                "}\n" +
                                "\n" +
                                "table {\n" +
                                "    width: 100%;\n" +
                                "}\n" +
                                "\n" +
                                "th, td {\n" +
                                "    border: black solid 1px;\n" +
                                "}\n")
                ),
                body(
                        h1("Inventory Report"),
                        br(),
                        table(
                                thead(
                                        th("Item code"),
                                        th("Item name"),
                                        th("Item size"),
                                        th("Alley"),
                                        th("Rack"),
                                        th("Quantity")
                                ), tbody(
                                        items.stream()
                                                .map(item -> tr(
                                                        td(item.getItem().getCode().toString()),
                                                        td(item.getItem().getName()),
                                                        td(item.getItem().getSize().toString()),
                                                        td(item.getLocation().getAlley()),
                                                        td(item.getLocation().getRack()),
                                                        td(String.valueOf(item.getQuantity()))
                                                ))
                                                .toArray(ContainerTag[]::new)
                                )
                        )
                )
        ).render();
    }

    private Document getDocumentFromHTML(String html) {
        Document document = Jsoup.parse(html);
        document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
        return document;
    }

    private InputStream getPDFInputStream(Document document) throws IOException {
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            ITextRenderer renderer = new ITextRenderer();
            SharedContext sharedContext = renderer.getSharedContext();
            sharedContext.setPrint(true);
            sharedContext.setInteractive(false);
            renderer.setDocumentFromString(document.html());
            renderer.layout();
            renderer.createPDF(outputStream);
            byte[] byteArr = outputStream.toByteArray();
            outputStream.close();
            return new ByteArrayInputStream(byteArr);
        }
    }
}
