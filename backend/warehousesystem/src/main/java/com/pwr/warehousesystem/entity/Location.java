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
    @Column(unique = true, nullable = false)
    private String locationId;
    private String rack;
    private String alley;
    private int capacity;
    private int availability;
    private String description;
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;
    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "item_location",
            joinColumns = {@JoinColumn(name = "location_id")},
            inverseJoinColumns = {@JoinColumn(name = "item_id")}
    )
    List<Item> items;


    @PrePersist
    private void constraintCheck(){
        if(this.locationId == null)
            throw  new OperationFailedException();
    }
}


