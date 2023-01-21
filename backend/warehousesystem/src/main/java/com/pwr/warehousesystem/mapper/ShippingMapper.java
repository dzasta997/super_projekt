package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.ShippingDTO;
import com.pwr.warehousesystem.entity.Shipping;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class ShippingMapper extends ApplicationMapperIgnoreNested<Shipping, ShippingDTO>{

    private final ClientMapper clientMapper;
    private final ItemShippingMapper itemShippingMapper;
    private final WarehouseMapper warehouseMapper;
    private final EmployeeMapper employeeMapper;

    public ShippingMapper(ClientMapper clientMapper, @Lazy ItemShippingMapper itemShippingMapper, WarehouseMapper warehouseMapper, EmployeeMapper employeeMapper) {
        this.clientMapper = clientMapper;
        this.itemShippingMapper = itemShippingMapper;
        this.warehouseMapper = warehouseMapper;
        this.employeeMapper = employeeMapper;
    }

    @Override
    public Shipping toEntity(ShippingDTO shippingDTO) {
        if(shippingDTO ==null){
            return null;
        }
        Shipping shipping = new Shipping();
        shipping.setId(shippingDTO.getId());
        shipping.setOrderDate(shippingDTO.getOrderDate());
        shipping.setClient(clientMapper.toEntity(shippingDTO.getClient()));
        shipping.setItems(itemShippingMapper.toEntity(shippingDTO.getItems()));
        shipping.setWarehouse(warehouseMapper.toEntity(shippingDTO.getWarehouse()));
        shipping.setStatus(shippingDTO.getStatus());
        shipping.setEmployee(employeeMapper.toEntity(shippingDTO.getEmployee()));

        return shipping;
    }

    @Override
    public ShippingDTO toDto(Shipping shipping, boolean ignoreNested) {
        if(shipping ==null){
            return null;
        }
        ShippingDTO shippingDTO = new ShippingDTO();
        shippingDTO.setId(shipping.getId());
        shippingDTO.setOrderDate(shipping.getOrderDate());
        shippingDTO.setClient(clientMapper.toDto(shipping.getClient()));
        if (!ignoreNested) {
            shippingDTO.setItems(itemShippingMapper.toDto(shipping.getItems(), true));
        }
        shippingDTO.setWarehouse(warehouseMapper.toDto(shipping.getWarehouse()));
        shippingDTO.setEmployee(employeeMapper.toDto(shipping.getEmployee()));
        shippingDTO.setStatus(shipping.getStatus());

        return shippingDTO;
    }
}
