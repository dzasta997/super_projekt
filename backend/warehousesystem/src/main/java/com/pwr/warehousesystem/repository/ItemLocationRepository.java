package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.ItemLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemLocationRepository extends JpaRepository<ItemLocation, Long> {
    List<ItemLocation> findAllByItemCode(long code);

    @Query("SELECT il FROM ItemLocation il " +
            "JOIN Location l ON il.location.id = l.id " +
            "JOIN Warehouse w ON l.warehouse.id = w.id " +
            "WHERE w.id = ?1 " +
            "ORDER BY il.item.code")
    List<ItemLocation> findAllByWarehouseId(long id);

    void deleteAllByLocationId(long id);

}