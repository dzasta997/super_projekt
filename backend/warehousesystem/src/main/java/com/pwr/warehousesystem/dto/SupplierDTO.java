package com.pwr.warehousesystem.dto;

import lombok.Data;

import java.util.List;

@Data
public class SupplierDTO {
    private Long id;
    private String supplierId;
    private String name;
    private String description;
    private AddressDTO address;
    private List<WarehouseDTO> warehouses;

}
