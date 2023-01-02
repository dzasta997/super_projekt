package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.DeliveryItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryItemRepository extends JpaRepository<DeliveryItem, Long> {
}