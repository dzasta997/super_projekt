package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> getAllByWarehouseId(long id);
}

