package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.ItemDTO;
import com.pwr.warehousesystem.dto.ItemDeliveryDTO;
import com.pwr.warehousesystem.dto.ItemLocationDTO;
import com.pwr.warehousesystem.dto.ItemShippingDTO;
import com.pwr.warehousesystem.entity.Item;
import com.pwr.warehousesystem.entity.ItemDelivery;
import com.pwr.warehousesystem.entity.ItemLocation;
import com.pwr.warehousesystem.entity.ItemShipping;
import com.pwr.warehousesystem.mapper.ItemDeliveryMapper;
import com.pwr.warehousesystem.mapper.ItemLocationMapper;
import com.pwr.warehousesystem.mapper.ItemMapper;
import com.pwr.warehousesystem.mapper.ItemShippingMapper;
import com.pwr.warehousesystem.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("items")
public class ItemController {

    private final ItemService itemService;
    private final ItemMapper itemMapper;
    private final ItemLocationMapper itemLocationMapper;
    private final ItemDeliveryMapper itemDeliveryMapper;
    private final ItemShippingMapper itemShippingMapper;

    @Autowired
    public ItemController(ItemService itemService, ItemMapper itemMapper, ItemLocationMapper itemLocationMapper, ItemDeliveryMapper itemDeliveryMapper, ItemShippingMapper itemShippingMapper) {
        this.itemService = itemService;
        this.itemMapper = itemMapper;
        this.itemLocationMapper = itemLocationMapper;
        this.itemDeliveryMapper = itemDeliveryMapper;
        this.itemShippingMapper = itemShippingMapper;
    }

    @GetMapping
    public ResponseEntity<List<ItemDTO>> getItems(){
        List<Item> items = itemService.getAll();
        return new ResponseEntity<>(itemMapper.toDto(items), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemDTO> getItemByCode(@PathVariable Long id){
        Item item = itemService.getById(id);
        return new ResponseEntity<>(itemMapper.toDto(item), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ItemDTO> saveItem(@RequestBody ItemDTO itemDTO){
        Item item = itemService.saveItem(itemMapper.toEntity(itemDTO));
        return new ResponseEntity<>(itemMapper.toDto(item), HttpStatus.OK);
    }

    @PostMapping("/location")
    public ResponseEntity<ItemLocationDTO> saveItemLocation(@RequestBody @Validated ItemLocationDTO itemLocationDTO){
        ItemLocation itemLocation = itemService.saveItemLocation(itemLocationMapper.toEntity(itemLocationDTO));
        return new ResponseEntity<>(itemLocationMapper.toDto(itemLocation, false), HttpStatus.OK);
    }

    @GetMapping("/location/itemcode/{code}/{warehouseId}")
    public ResponseEntity<List<ItemLocationDTO>> getItemLocationsByItemCode(@PathVariable long code, @PathVariable long warehouseId){
        List<ItemLocation> itemLocations = itemService.getItemLocationsByItemCode(code, warehouseId);
        return new ResponseEntity<>(itemLocationMapper.toDto(itemLocations, false), HttpStatus.OK);
    }

    @PostMapping("/delivery")
    public ResponseEntity<ItemDeliveryDTO> saveItemDelivery(@RequestBody @Validated ItemDeliveryDTO itemDeliveryDTO){
        ItemDelivery itemDelivery = itemService.saveItemDelivery(itemDeliveryMapper.toEntity(itemDeliveryDTO));
        return new ResponseEntity<>(itemDeliveryMapper.toDto(itemDelivery, false), HttpStatus.OK);
    }

    @PostMapping("/shipping")
    public ResponseEntity<ItemShippingDTO> saveItemShipping(@RequestBody @Validated ItemShippingDTO itemShippingDTO){
        ItemShipping itemShipping = itemService.saveItemShipping(itemShippingMapper.toEntity(itemShippingDTO));
        return new ResponseEntity<>(itemShippingMapper.toDto(itemShipping, false), HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id){
        itemService.deleteItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
