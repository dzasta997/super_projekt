package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    Optional<Supplier> findBySupplierId(String supplierId);

    boolean existsBySupplierId(String supplierId);

    void deleteBySupplierId(String supplierId);
}

