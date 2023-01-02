package com.pwr.warehousesystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pwr.warehousesystem.enumeration.ItemSize;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String clientId;
    private String name;
    private String description;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;
    @ManyToMany
    @JoinTable(
            name = "warehouse_client",
            joinColumns = @JoinColumn(name = "client_id"),
            inverseJoinColumns = @JoinColumn(name = "warehouse_id"))
    private List<Warehouse> warehouses;
}
