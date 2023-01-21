package com.pwr.warehousesystem.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
public class ItemShipping {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int quantity;
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Shipping shipping;
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;
}