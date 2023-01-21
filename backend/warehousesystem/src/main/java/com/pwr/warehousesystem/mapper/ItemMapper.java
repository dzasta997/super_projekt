package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.ItemDTO;
import com.pwr.warehousesystem.entity.Item;
import org.springframework.stereotype.Component;

@Component
public class ItemMapper extends ApplicationMapper<Item, ItemDTO> {
    @Override
    public Item toEntity(ItemDTO itemDTO) {
        if(itemDTO==null){
            return null;
        }
        Item item = new Item();
        item.setCode(itemDTO.getCode());
        item.setName(itemDTO.getName());
        item.setSize(itemDTO.getSize());
        item.setDescription(itemDTO.getDescription());
        return item;
    }

    @Override
    public ItemDTO toDto(Item item) {
        if(item==null){
            return null;
        }
        ItemDTO itemDTO = new ItemDTO();
        itemDTO.setCode(item.getCode());
        itemDTO.setName(item.getName());
        itemDTO.setSize(item.getSize());
        itemDTO.setDescription(item.getDescription());
        return itemDTO;
    }
}
