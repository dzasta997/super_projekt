package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.DeliveryDTO;
import com.pwr.warehousesystem.entity.Delivery;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class DeliveryMapper extends ApplicationMapperIgnoreNested<Delivery, DeliveryDTO> {

    private final ItemDeliveryMapper itemDeliveryMapper;
    private final SupplierMapper supplierMapper;
    private final WarehouseMapper warehouseMapper;
    private final EmployeeMapper employeeMapper;

    public DeliveryMapper(@Lazy ItemDeliveryMapper itemDeliveryMapper, SupplierMapper supplierMapper, WarehouseMapper warehouseMapper, EmployeeMapper employeeMapper) {
        this.itemDeliveryMapper = itemDeliveryMapper;
        this.supplierMapper = supplierMapper;
        this.warehouseMapper = warehouseMapper;
        this.employeeMapper = employeeMapper;
    }

    //TODO: Add item list mapping
    @Override
    public Delivery toEntity(DeliveryDTO deliveryDTO) {
        if(deliveryDTO==null){
            return null;
        }
        Delivery delivery = new Delivery();
        delivery.setId(deliveryDTO.getId());
        delivery.setDeliveryDate(deliveryDTO.getDeliveryDate());
        delivery.setSupplier(supplierMapper.toEntity(deliveryDTO.getSupplier()));
        delivery.setItems(itemDeliveryMapper.toEntity(deliveryDTO.getItems()));
        delivery.setWarehouse(warehouseMapper.toEntity(deliveryDTO.getWarehouse()));
        delivery.setStatus(deliveryDTO.getStatus());
        delivery.setEmployee(employeeMapper.toEntity(deliveryDTO.getEmployee()));

        return delivery;
    }

    @Override
    public DeliveryDTO toDto(Delivery delivery, boolean ignoreNested) {
        if(delivery==null){
            return null;
        }
        DeliveryDTO deliveryDTO = new DeliveryDTO();
        deliveryDTO.setId(delivery.getId());
        deliveryDTO.setDeliveryDate(delivery.getDeliveryDate());
        deliveryDTO.setSupplier(supplierMapper.toDto(delivery.getSupplier()));
        if (!ignoreNested) {
            deliveryDTO.setItems(itemDeliveryMapper.toDto(delivery.getItems(), true));
        }
        deliveryDTO.setWarehouse(warehouseMapper.toDto(delivery.getWarehouse()));
        deliveryDTO.setStatus(delivery.getStatus());
        deliveryDTO.setEmployee(employeeMapper.toDto(delivery.getEmployee()));

        return deliveryDTO;
    }
}
