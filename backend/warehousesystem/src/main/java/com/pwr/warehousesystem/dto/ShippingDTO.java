package com.pwr.warehousesystem.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ShippingDTO {

    private Long id;
    private Date orderDate;
    private ClientDTO client;
    private List<ItemShippingDTO> items;
    private WarehouseDTO warehouse;
    private EmployeeDTO employee;
    private String status;
}
