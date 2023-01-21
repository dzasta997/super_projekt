package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.ItemLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemLocationRepository extends JpaRepository<ItemLocation, Long> {
    List<ItemLocation> findAllByItemCode(long code);

    @Query()
    List<ItemLocation> findAllByWarehouseId(long code);

}