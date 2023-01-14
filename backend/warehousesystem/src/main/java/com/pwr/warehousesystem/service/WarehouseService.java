package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Warehouse;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WarehouseService {

    private final WarehouseRepository warehouseRepository;

    @Autowired
    public WarehouseService(WarehouseRepository warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }

    public Warehouse findWarehouse(String warehouseId) {
        return warehouseRepository.findByWarehouseId(warehouseId).orElseThrow(ElementNotFoundException::new);
    }

    public List<Warehouse> findAll() {
        return warehouseRepository.findAll();
    }

    public long deleteWarehouse(String warehouseId) {
        return warehouseRepository.deleteByWarehouseId(warehouseId);
    }

    public Warehouse saveWarehouse(Warehouse warehouse) {
        if ((warehouse.getId() != null && warehouseRepository.existsById(warehouse.getId()))
                || warehouseRepository.existsByWarehouseId(warehouse.getWarehouseId())
        ) {
            throw new OperationFailedException();
        }
        return warehouseRepository.save(warehouse);
    }
}
