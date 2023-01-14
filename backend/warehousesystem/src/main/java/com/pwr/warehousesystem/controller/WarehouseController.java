package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.entity.Warehouse;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/warehouse")
public class WarehouseController {

    private final WarehouseService warehouseService;

    @Autowired
    public WarehouseController(WarehouseService warehouseService) {
        this.warehouseService = warehouseService;
    }


    @GetMapping("/{warehouseId}")
    public ResponseEntity<Warehouse> getWarehouse(@PathVariable String warehouseId) {
        Warehouse warehouse = warehouseService.findWarehouse(warehouseId);
        return new ResponseEntity<>(warehouse, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Warehouse>> getAllWarehouses() {
        List<Warehouse> warehouses = warehouseService.findAll();
        return new ResponseEntity<>(warehouses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Warehouse> postWarehouse(@RequestBody Warehouse warehouse){
        Warehouse saved = warehouseService.saveWarehouse(warehouse);
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

    @DeleteMapping("/{warehouseId}")
    public ResponseEntity<Long> deleteWarehouse(@PathVariable String warehouseId){
        long deleted = warehouseService.deleteWarehouse(warehouseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


     }
