package com.pwr.warehousesystem.entity;

import com.pwr.warehousesystem.exception.OperationFailedException;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Location {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String rack;
    private String alley;
    private int capacity;
    private int availability;
    private String description;
    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "location", cascade = CascadeType.ALL)
    List<ItemLocation> items;

}


