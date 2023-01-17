package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.ItemDeliveryDTO;
import com.pwr.warehousesystem.entity.ItemDelivery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class ItemDeliveryMapper extends ApplicationMapperIgnoreNested<ItemDelivery, ItemDeliveryDTO> {

    private final ItemMapper itemMapper;
    private final DeliveryMapper deliveryMapper;

    @Autowired
    public ItemDeliveryMapper(ItemMapper itemMapper,@Lazy DeliveryMapper deliveryMapper) {
        this.itemMapper = itemMapper;
        this.deliveryMapper = deliveryMapper;
    }

    @Override
    public ItemDelivery toEntity(ItemDeliveryDTO itemDeliveryDTO) {
        if(itemDeliveryDTO ==null){
            return null;
        }

        ItemDelivery itemDelivery = new ItemDelivery();
        itemDelivery.setId(itemDeliveryDTO.getId());
        itemDelivery.setItem(itemMapper.toEntity(itemDeliveryDTO.getItem()));
        itemDelivery.setDelivery(deliveryMapper.toEntity(itemDeliveryDTO.getDelivery()));
        itemDelivery.setQuantity(itemDeliveryDTO.getQuantity());

        return itemDelivery;
    }

    @Override
    public ItemDeliveryDTO toDto(ItemDelivery itemDelivery, boolean ignoreNested) {
        if(itemDelivery==null){
            return null;
        }

        ItemDeliveryDTO itemDeliveryDTO = new ItemDeliveryDTO();
        itemDeliveryDTO.setId(itemDelivery.getId());
        itemDeliveryDTO.setItem(itemMapper.toDto(itemDelivery.getItem()));
        if (!ignoreNested) {
            itemDeliveryDTO.setDelivery(deliveryMapper.toDto(itemDelivery.getDelivery(), true));
        }
        itemDeliveryDTO.setQuantity(itemDelivery.getQuantity());

        return itemDeliveryDTO;
    }
}
