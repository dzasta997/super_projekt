package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.WarehouseDTO;
import com.pwr.warehousesystem.entity.Warehouse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class WarehouseMapper extends ApplicationMapper<Warehouse, WarehouseDTO> {
    private final AddressMapper addressMapper;

    @Autowired
    public WarehouseMapper( AddressMapper addressMapper) {
        this.addressMapper = addressMapper;
    }

    @Override
    public Warehouse toEntity(WarehouseDTO warehouseDTO) {
        if(warehouseDTO==null){
            return null;
        }
        Warehouse warehouse = new Warehouse();
        warehouse.setId(warehouse.getId());
        warehouse.setWarehouseId(warehouseDTO.getWarehouseId());
        warehouse.setDescription(warehouseDTO.getDescription());
        warehouse.setAddress(addressMapper.toEntity(warehouseDTO.getAddress()));
        return warehouse;
    }

    @Override
    public WarehouseDTO toDto(Warehouse warehouse) {
        if(warehouse==null){
            return null;
        }
        WarehouseDTO warehouseDTO = new WarehouseDTO();
        warehouseDTO.setId(warehouse.getId());
        warehouseDTO.setWarehouseId(warehouse.getWarehouseId());
        warehouseDTO.setDescription(warehouse.getDescription());
        warehouseDTO.setAddress(addressMapper.toDto(warehouse.getAddress()));
        return warehouseDTO;
    }
}
