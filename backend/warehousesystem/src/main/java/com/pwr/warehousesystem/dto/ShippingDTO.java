package com.pwr.warehousesystem.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ShippingDTO {

    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date orderDate;
    private ClientDTO client;
    private List<ItemShippingDTO> items;
    private WarehouseDTO warehouse;
    private EmployeeDTO employee;
    private String status;
}
