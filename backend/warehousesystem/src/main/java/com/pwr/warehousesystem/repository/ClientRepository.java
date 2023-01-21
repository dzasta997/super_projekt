package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

    Optional<Client> findByName(String name);

    @Query("SELECT c FROM Client c " +
            "JOIN Shipping s ON s.client.id = c.id " +
            "JOIN Warehouse w ON s.warehouse.id = w.id " +
            "WHERE w.id = ?1")
    List<Client> findAllByWarehouseId(long warehouseId);

}