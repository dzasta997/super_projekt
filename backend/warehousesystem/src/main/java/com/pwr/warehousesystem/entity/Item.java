package com.pwr.warehousesystem.entity;

import com.pwr.warehousesystem.enumeration.ItemSize;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Item {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private int code;
    private String name;
    @Enumerated(EnumType.STRING)
    private ItemSize size;
    private String description;
}
