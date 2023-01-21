package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.ItemLocation;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
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

    public InputStreamResource getInventoryReport(long warehouseId) throws IOException {
        System.setProperty("java.net.useSystemProxies", "true");
        String html = generateHTML();
        Document document = getDocumentFromHTML(html);
        InputStream inputStream = getPDFInputStream(document);
        return new InputStreamResource(inputStream);
    }

    private List<ItemLocation> getAllItemLocationInWarehouse(long warehouseId) {

    }
    private String generateHTML() {
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
                                "th, tr {\n" +
                                "    border: black solid 1px;\n" +
                                "}\n")
                ),
                body(
                        h1("Inventory Report"),
                        br(),
                        table(
                                thead(
                                        th("Item ID"),
                                        th("Item name"),
                                        th("Item size"),
                                        th("Alley"),
                                        th("Rack"),
                                        th("Quantity")
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
