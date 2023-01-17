package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.ItemShippingDTO;
import com.pwr.warehousesystem.entity.ItemShipping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class ItemShippingMapper extends ApplicationMapperIgnoreNested<ItemShipping, ItemShippingDTO> {

    private final ItemMapper itemMapper;
    private final ShippingMapper shippingMapper;

    @Autowired
    public ItemShippingMapper(ItemMapper itemMapper, @Lazy ShippingMapper shippingMapper) {
        this.itemMapper = itemMapper;
        this.shippingMapper = shippingMapper;
    }

    @Override
    public ItemShipping toEntity(ItemShippingDTO itemShippingDTO) {
        if(itemShippingDTO ==null){
            return null;
        }

        ItemShipping itemShipping = new ItemShipping();
        itemShipping.setId(itemShippingDTO.getId());
        itemShipping.setItem(itemMapper.toEntity(itemShippingDTO.getItem()));
        itemShipping.setShipping(shippingMapper.toEntity(itemShippingDTO.getShipping()));
        itemShipping.setQuantity(itemShippingDTO.getQuantity());

        return itemShipping;
    }

    @Override
    public ItemShippingDTO toDto(ItemShipping itemShipping, boolean ignoreNested) {
        if(itemShipping==null){
            return null;
        }

        ItemShippingDTO itemShippingDTO = new ItemShippingDTO();
        itemShippingDTO.setId(itemShipping.getId());
        itemShippingDTO.setItem(itemMapper.toDto(itemShipping.getItem()));
        if (!ignoreNested) {
            itemShippingDTO.setShipping(shippingMapper.toDto(itemShipping.getShipping(), true));
        }
        itemShippingDTO.setQuantity(itemShipping.getQuantity());

        return itemShippingDTO;
    }
}
