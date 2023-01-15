package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.DeliveryDTO;
import com.pwr.warehousesystem.entity.Delivery;
import org.springframework.stereotype.Component;

@Component
public class DeliveryMapper extends ApplicationMapper<Delivery, DeliveryDTO> {

    private final ItemMapper itemMapper;
    private final SupplierMapper supplierMapper;

    public DeliveryMapper(ItemMapper itemMapper, SupplierMapper supplierMapper) {
        this.itemMapper = itemMapper;
        this.supplierMapper = supplierMapper;
    }

    //TODO: Add item list mapping
    @Override
    public Delivery toEntity(DeliveryDTO deliveryDTO) {
        if(deliveryDTO==null){
            return null;
        }
        Delivery delivery = new Delivery();
        delivery.setId(deliveryDTO.getId());
        delivery.setDeliveryId(deliveryDTO.getDeliveryId());
        delivery.setDeliveryDate(deliveryDTO.getDeliveryDate());
        delivery.setSupplier(supplierMapper.toEntity(deliveryDTO.getSupplier()));
        delivery.setItems(itemMapper.toEntity(deliveryDTO.getItems()));
        return delivery;

    }

    @Override
    public DeliveryDTO toDto(Delivery delivery) {
        if(delivery==null){
            return null;
        }
        DeliveryDTO deliveryDTO = new DeliveryDTO();
        deliveryDTO.setId(delivery.getId());
        deliveryDTO.setDeliveryId(delivery.getDeliveryId());
        deliveryDTO.setDeliveryDate(delivery.getDeliveryDate());
        deliveryDTO.setSupplier(supplierMapper.toDto(delivery.getSupplier()));
        deliveryDTO.setItems(itemMapper.toDto(delivery.getItems()));
        return deliveryDTO;
    }
}
