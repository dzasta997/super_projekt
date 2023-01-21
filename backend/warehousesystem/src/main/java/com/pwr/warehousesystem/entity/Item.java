package com.pwr.warehousesystem.entity;

import com.pwr.warehousesystem.enumeration.ItemSize;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Item {
    @Id
    private Long code;
    private String name;
    @Enumerated(EnumType.STRING)
    private ItemSize size;
    private String description;


}
