package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Warehouse;
import com.pwr.warehousesystem.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;

    @Autowired
    public WarehouseService(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    public Optional<Warehouse> findWarehouse(String warehouseId){
        return warehouseRepository.findByWarehouseId(warehouseId);
    }

    public long deleteWarehouse(String warehouseId){
        return warehouseRepository.deleteByWarehouseId(warehouseId);
    }

    public Warehouse saveWarehouse(Warehouse warehouse){
        return warehouseRepository.save(warehouse);
    }
}
