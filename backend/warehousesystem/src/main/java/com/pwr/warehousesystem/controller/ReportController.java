package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.*;

@Controller
@RequestMapping("reports")
public class ReportController {

    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping(value = "/inventory/{warehouseId}", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<InputStreamResource> getInventoryReport(@PathVariable long warehouseId) throws IOException {
        MediaType contentType = MediaType.APPLICATION_PDF;
        InputStreamResource inputStreamResource = reportService.getInventoryReport(warehouseId);
        return ResponseEntity.ok().contentType(contentType).body(inputStreamResource);
    }
}
