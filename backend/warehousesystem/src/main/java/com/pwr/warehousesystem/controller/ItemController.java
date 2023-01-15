package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.ItemDTO;
import com.pwr.warehousesystem.entity.Item;
import com.pwr.warehousesystem.mapper.ItemMapper;
import com.pwr.warehousesystem.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("items")
public class ItemController {

    private final ItemService itemService;
    private final ItemMapper itemMapper;

    @Autowired
    public ItemController(ItemService itemService, ItemMapper itemMapper) {
        this.itemService = itemService;
        this.itemMapper = itemMapper;
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


    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity deleteItem(@PathVariable Long id){
        itemService.deleteItem(id);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
