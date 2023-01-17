package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.ItemLocationDTO;
import com.pwr.warehousesystem.entity.ItemLocation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class ItemLocationMapper extends ApplicationMapperIgnoreNested<ItemLocation, ItemLocationDTO> {

    private final ItemMapper itemMapper;
    private final LocationMapper locationMapper;

    @Autowired
    public ItemLocationMapper(ItemMapper itemMapper, @Lazy LocationMapper locationMapper) {
        this.itemMapper = itemMapper;
        this.locationMapper = locationMapper;
    }

    @Override
    public ItemLocation toEntity(ItemLocationDTO itemLocationDTO) {
        if(itemLocationDTO ==null){
            return null;
        }

        ItemLocation itemLocation = new ItemLocation();
        itemLocation.setId(itemLocationDTO.getId());
        itemLocation.setItem(itemMapper.toEntity(itemLocationDTO.getItem()));
        itemLocation.setLocation(locationMapper.toEntity(itemLocationDTO.getLocation()));
        itemLocation.setQuantity(itemLocationDTO.getQuantity());

        return itemLocation;
    }

    @Override
    public ItemLocationDTO toDto(ItemLocation itemLocation, boolean ignoreNested) {
        if(itemLocation==null){
            return null;
        }

        ItemLocationDTO itemLocationDTO = new ItemLocationDTO();
        itemLocationDTO.setId(itemLocation.getId());
        itemLocationDTO.setItem(itemMapper.toDto(itemLocation.getItem()));
        if (!ignoreNested) {
            itemLocationDTO.setLocation(locationMapper.toDto(itemLocation.getLocation(), true));
        }
        itemLocationDTO.setQuantity(itemLocation.getQuantity());
        return itemLocationDTO;
    }
}
