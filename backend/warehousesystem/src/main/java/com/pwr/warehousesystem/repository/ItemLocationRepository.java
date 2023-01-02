package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.ItemLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemLocationRepository extends JpaRepository<ItemLocation, Long> {
}
