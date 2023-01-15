package com.pwr.warehousesystem.dto;

import com.pwr.warehousesystem.enumeration.ItemSize;
import lombok.Data;

@Data
public class ItemDTO {
    private Long id;
    private int code;
    private String name;
    private ItemSize size;
    private String description;

}
