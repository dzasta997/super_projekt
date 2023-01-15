package com.pwr.warehousesystem.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Delivery {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String deliveryId;
    private Date deliveryDate;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
    @ManyToMany
    @JoinTable(
            name = "delivery_item",
            joinColumns = {@JoinColumn(name = "delivery_id")},
            inverseJoinColumns = {@JoinColumn(name="item_id")}
    )
    private List<Item> items;
}
