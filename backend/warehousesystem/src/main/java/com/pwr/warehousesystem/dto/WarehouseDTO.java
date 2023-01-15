package com.pwr.warehousesystem.dto;

import lombok.Data;

@Data
public class WarehouseDTO {
    private Long id;
    private String warehouseId;
    private String description;
    private AddressDTO address;
}
