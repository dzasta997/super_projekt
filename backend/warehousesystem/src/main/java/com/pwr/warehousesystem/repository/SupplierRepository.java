package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    @Query("SELECT s FROM Supplier s " +
            "JOIN Delivery d ON d.supplier.id = s.id " +
            "JOIN Warehouse w ON d.warehouse.id = w.id " +
            "WHERE w.id = ?1")
    List<Supplier> findAllByWarehouseId(long warehouseId);
}

