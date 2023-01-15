package com.pwr.warehousesystem.dto;

import lombok.Data;

import java.util.List;

@Data
public class LocationDTO {
    private Long id;
    private String locationId;
    private String rack;
    private String alley;
    private int capacity;
    private int availability;
    private String description;
    private WarehouseDTO warehouse;
    List<ItemDTO> items;
}
