package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Long> {
    Optional<Warehouse> findByWarehouseId(String warehouseId);

    void deleteByWarehouseId(String warehouseId);

    boolean existsByWarehouseId(String warehouseId);

}
