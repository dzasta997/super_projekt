package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.DeliveryDTO;
import com.pwr.warehousesystem.entity.Delivery;
import com.pwr.warehousesystem.mapper.DeliveryMapper;
import com.pwr.warehousesystem.service.DeliveryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<DeliveryDTO>> getAllDeliveries(){
        List<Delivery> deliveries = deliveryService.getAll();
        return new ResponseEntity<>(deliveryMapper.toDto(deliveries), HttpStatus.OK);
    }

    @GetMapping("/{deliveryId}")
    public ResponseEntity<DeliveryDTO> getByDeliveryId(@PathVariable String deliveryId){
        Delivery delivery = deliveryService.findByDeliveryId(deliveryId);
        return new ResponseEntity<>(deliveryMapper.toDto(delivery), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DeliveryDTO> saveDelivery(@RequestBody DeliveryDTO deliveryDTO){
        Delivery savedDelivery = deliveryService.saveDelivery(deliveryMapper.toEntity(deliveryDTO));
        return new ResponseEntity<>(deliveryMapper.toDto(savedDelivery), HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/{deliveryId}")
    public ResponseEntity deleteDelivery(@PathVariable String deliveryId){
         deliveryService.deleteDelivery(deliveryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}