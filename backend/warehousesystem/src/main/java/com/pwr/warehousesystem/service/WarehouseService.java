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

    public Warehouse findWarehouse(long warehouseId) {
        return warehouseRepository.findById(warehouseId).orElseThrow(ElementNotFoundException::new);
    }

    public List<Warehouse> findAll() {
        return warehouseRepository.findAll();
    }

    public List<Warehouse> findAllByCity(String city) {
        return warehouseRepository.findAllByAddressCity(city);
    }

    public void deleteWarehouse(long warehouseId) {
        if(!warehouseRepository.existsById(warehouseId)){
            throw new OperationFailedException();
        }
         warehouseRepository.deleteById(warehouseId);
    }

    public Warehouse saveWarehouse(Warehouse warehouse) {
        if ((warehouse.getId() != null && warehouseRepository.existsById(warehouse.getId()))
        ) {
            throw new OperationFailedException();
        }
        return warehouseRepository.save(warehouse);
    }
}
