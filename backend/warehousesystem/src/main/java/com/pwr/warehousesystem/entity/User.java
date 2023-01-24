package com.pwr.warehousesystem.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="warehouse_user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false, unique = true)
    private String username;
    private String password;
}
