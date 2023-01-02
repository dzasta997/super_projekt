package com.pwr.warehousesystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DeliveryItem {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int quantity;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "item_id")
    private Item item;
}