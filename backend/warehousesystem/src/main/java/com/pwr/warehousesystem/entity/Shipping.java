package com.pwr.warehousesystem.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Entity
@Data
public class Shipping {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private Date orderDate;
    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "shipping")
    private List<ItemShipping> items;
    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
    private String status;
}
