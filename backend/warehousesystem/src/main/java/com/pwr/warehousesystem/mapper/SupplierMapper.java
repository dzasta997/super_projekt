package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.SupplierDTO;
import com.pwr.warehousesystem.entity.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SupplierMapper extends ApplicationMapper<Supplier, SupplierDTO> {

    private final AddressMapper addressMapper;
    private final WarehouseMapper warehouseMapper;

    @Autowired
    public SupplierMapper(AddressMapper addressMapper, WarehouseMapper warehouseMapper) {
        this.addressMapper = addressMapper;
        this.warehouseMapper = warehouseMapper;
    }

    @Override
    public Supplier toEntity(SupplierDTO supplierDTO) {
        if(supplierDTO==null){
            return null;
        }
        Supplier supplier = new Supplier();
        supplier.setId(supplierDTO.getId());
        supplier.setName(supplierDTO.getName());
        supplier.setDescription(supplierDTO.getDescription());
        supplier.setAddress(addressMapper.toEntity(supplierDTO.getAddress()));
        supplier.setWarehouses(warehouseMapper.toEntity(supplierDTO.getWarehouses()));
        return supplier;
    }

    @Override
    public SupplierDTO toDto(Supplier supplier) {
        if(supplier==null){
            return null;
        }
        SupplierDTO supplierDTO = new SupplierDTO();
        supplierDTO.setId(supplier.getId());
        supplierDTO.setName(supplier.getName());
        supplierDTO.setDescription(supplier.getDescription());
        supplierDTO.setAddress(addressMapper.toDto(supplier.getAddress()));
        supplierDTO.setWarehouses(warehouseMapper.toDto(supplier.getWarehouses()));
        return supplierDTO;
    }
}
