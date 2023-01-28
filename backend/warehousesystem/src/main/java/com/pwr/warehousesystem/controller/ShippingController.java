package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.ShippingDTO;
import com.pwr.warehousesystem.entity.Shipping;
import com.pwr.warehousesystem.mapper.ShippingMapper;
import com.pwr.warehousesystem.service.ShippingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("orders")
public class ShippingController {

    private final ShippingService shippingService;
    private final ShippingMapper shippingMapper;

    public ShippingController(ShippingService shippingService, ShippingMapper shippingMapper) {
        this.shippingService = shippingService;
        this.shippingMapper = shippingMapper;
    }

    @GetMapping
    public ResponseEntity<List<ShippingDTO>> getAllShippings() {
        List<Shipping> shippings = shippingService.getAllShippings();
        return new ResponseEntity<>(shippingMapper.toDto(shippings, false), HttpStatus.OK);
    }

    @GetMapping("/warehouse/{id}")
    public ResponseEntity<List<ShippingDTO>> getAllShippingsByWarehouseId(@PathVariable long id) {
        List<Shipping> shippings = shippingService.getAllByWarehouseId(id);
        return new ResponseEntity<>(shippingMapper.toDto(shippings, false), HttpStatus.OK);
    }

    @GetMapping("/{shippingId}")
    public ResponseEntity<ShippingDTO> getByShippingId(@PathVariable long shippingId) {
        Shipping shipping = shippingService.getByShippingId(shippingId);
        return new ResponseEntity<>(shippingMapper.toDto(shipping, false), HttpStatus.OK);
    }

    @Transactional
    @PostMapping
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<ShippingDTO> saveShipping(@RequestBody ShippingDTO shippingDTO) {
        Shipping shipping = shippingService.saveShipping(shippingMapper.toEntity(shippingDTO));
        return new ResponseEntity<>(shippingMapper.toDto(shipping, false), HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/edit")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<ShippingDTO> updateShipping(@RequestBody ShippingDTO shippingDTO) {
        Shipping shipping = shippingService.updateShipping(shippingMapper.toEntity(shippingDTO));
        return new ResponseEntity<>(shippingMapper.toDto(shipping, false), HttpStatus.OK);
    }


    @Transactional
    @DeleteMapping("/{shippingId}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteShipping(@PathVariable long shippingId) {
        shippingService.deleteShipping(shippingId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
