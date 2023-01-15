package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<Item> getByCode(int code);

    boolean existsByCode(int code);
}

