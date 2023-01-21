package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.WarehouseDTO;
import com.pwr.warehousesystem.entity.Warehouse;
import com.pwr.warehousesystem.mapper.WarehouseMapper;
import com.pwr.warehousesystem.service.WarehouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/warehouses")
public class WarehouseController {

    private final WarehouseService warehouseService;
    private final WarehouseMapper warehouseMapper;

    @Autowired
    public WarehouseController(WarehouseService warehouseService, WarehouseMapper warehouseMapper) {
        this.warehouseService = warehouseService;
        this.warehouseMapper = warehouseMapper;
    }


    @GetMapping("/{warehouseId}")
    public ResponseEntity<WarehouseDTO> getWarehouse(@PathVariable long warehouseId) {
        Warehouse warehouse = warehouseService.findWarehouse(warehouseId);
        return new ResponseEntity<>(warehouseMapper.toDto(warehouse), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<WarehouseDTO>> getAllWarehouses() {
        List<Warehouse> warehouses = warehouseService.findAll();
        return new ResponseEntity<>(warehouseMapper.toDto(warehouses), HttpStatus.OK);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<WarehouseDTO>> getAllWarehousesByCity(@PathVariable String city) {
        List<Warehouse> warehouses = warehouseService.findAllByCity(city);
        return new ResponseEntity<>(warehouseMapper.toDto(warehouses), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<WarehouseDTO> postWarehouse(@RequestBody WarehouseDTO warehouse){
        Warehouse saved = warehouseService.saveWarehouse(warehouseMapper.toEntity(warehouse));
        return new ResponseEntity<>(warehouseMapper.toDto(saved), HttpStatus.OK);
    }


    @Transactional
    @DeleteMapping("/{warehouseId}")
    public ResponseEntity<Void> deleteWarehouse(@PathVariable long warehouseId){
        warehouseService.deleteWarehouse(warehouseId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


     }
