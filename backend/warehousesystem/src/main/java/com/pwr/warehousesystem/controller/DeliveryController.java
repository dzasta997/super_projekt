package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.DeliveryDTO;
import com.pwr.warehousesystem.entity.Delivery;
import com.pwr.warehousesystem.mapper.DeliveryMapper;
import com.pwr.warehousesystem.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/deliveries")
public class DeliveryController {

    private final DeliveryService deliveryService;
    private final DeliveryMapper deliveryMapper;

    @Autowired
    public DeliveryController(DeliveryService deliveryService, DeliveryMapper deliveryMapper) {
        this.deliveryService = deliveryService;
        this.deliveryMapper = deliveryMapper;
    }

    @GetMapping
    public ResponseEntity<List<DeliveryDTO>> getAllDeliveries() {
        List<Delivery> deliveries = deliveryService.getAll();
        return new ResponseEntity<>(deliveryMapper.toDto(deliveries, false), HttpStatus.OK);
    }

    @GetMapping("/warehouse/{id}")
    public ResponseEntity<List<DeliveryDTO>> getAllDeliveriesByWarehouseId(@PathVariable long id) {
        List<Delivery> deliveries = deliveryService.getAllByWarehouseId(id);
        return new ResponseEntity<>(deliveryMapper.toDto(deliveries, false), HttpStatus.OK);
    }


    @GetMapping("/{deliveryId}")
    public ResponseEntity<DeliveryDTO> getByDeliveryId(@PathVariable long deliveryId) {
        Delivery delivery = deliveryService.findByDeliveryId(deliveryId);
        return new ResponseEntity<>(deliveryMapper.toDto(delivery, false), HttpStatus.OK);
    }

    @Transactional
    @PostMapping
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<DeliveryDTO> saveDelivery(@RequestBody DeliveryDTO deliveryDTO) {
        Delivery savedDelivery = deliveryService.saveDelivery(deliveryMapper.toEntity(deliveryDTO));
        return new ResponseEntity<>(deliveryMapper.toDto(savedDelivery, false), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/edit")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<DeliveryDTO> updateDelivery(@RequestBody DeliveryDTO deliveryDTO) {
        Delivery savedDelivery = deliveryService.updateDelivery(deliveryMapper.toEntity(deliveryDTO));
        return new ResponseEntity<>(deliveryMapper.toDto(savedDelivery, false), HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/{deliveryId}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteDelivery(@PathVariable long deliveryId) {
        deliveryService.deleteDelivery(deliveryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
