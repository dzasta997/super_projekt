package com.pwr.warehousesystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pwr.warehousesystem.exception.OperationFailedException;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Warehouse {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    @Column(unique = true, nullable = false)
    private String warehouseId;
    private String description;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;
    @ManyToMany(mappedBy = "warehouses")
    private List<Client> clients;

    @PrePersist
    private void constraintCheck(){
        if(this.warehouseId == null)
            throw  new OperationFailedException();
    }

}
