package com.pwr.warehousesystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ItemLocation {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "location_id")
    private Location location;
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;
    private int quantity;

}
