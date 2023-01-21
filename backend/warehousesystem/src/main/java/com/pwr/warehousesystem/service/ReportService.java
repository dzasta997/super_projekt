package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Delivery;
import com.pwr.warehousesystem.entity.ItemLocation;
import com.pwr.warehousesystem.entity.Shipping;
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
import java.util.List;

import static j2html.TagCreator.*;

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
        List<Delivery> deliveries = deliveryService.getAllByWarehouseId(warehouseId);
        List<Shipping> shippings = shippingService.getAllByWarehouseId(warehouseId);
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
        return html(

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
