package com.pwr.warehousesystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
public class ItemDelivery {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;
}