package com.pwr.warehousesystem.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Delivery {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private int deliveryId;
    private Date deliveryDate;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "supplier_id")
    private Supplier supplier;
}
