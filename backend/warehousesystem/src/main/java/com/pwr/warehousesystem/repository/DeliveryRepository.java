package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    Optional<Delivery> findByDeliveryId(String deliveryId);

    boolean existsByDeliveryId(String deliveryId);

    void deleteByDeliveryId(String deliveryId);
}

