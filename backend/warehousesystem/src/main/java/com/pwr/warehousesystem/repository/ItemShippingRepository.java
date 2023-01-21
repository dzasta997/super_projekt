package com.pwr.warehousesystem.repository;

import com.pwr.warehousesystem.entity.ItemShipping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemShippingRepository extends JpaRepository<ItemShipping, Long> {
    void deleteAllByShippingId(long id);

}
