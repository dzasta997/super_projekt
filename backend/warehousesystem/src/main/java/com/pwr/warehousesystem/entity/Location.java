package com.pwr.warehousesystem.entity;

import com.pwr.warehousesystem.exception.OperationFailedException;
import jakarta.persistence.*;
import lombok.Data;

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
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;



    @PrePersist
    private void constraintCheck(){
        if(this.locationId == null)
            throw  new OperationFailedException();
    }
}


