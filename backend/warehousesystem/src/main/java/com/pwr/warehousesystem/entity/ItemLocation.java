package com.pwr.warehousesystem.entity;

import com.pwr.warehousesystem.enumeration.ItemSize;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ItemLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int quantity;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "location_id")
    private Location location;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "item_id")
    private Item item;
}
