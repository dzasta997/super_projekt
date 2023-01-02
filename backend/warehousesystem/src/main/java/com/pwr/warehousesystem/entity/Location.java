package com.pwr.warehousesystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Location {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String locationId;
    private String rack;
    private String alley;
    private int capacity;
    private int availability;
    private String description;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;}
