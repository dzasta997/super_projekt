package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> getByOrderId(String orderId);

    boolean existsByOrderId(String orderId);

    Long deleteByOrderId(String orderId);
}
