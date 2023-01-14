package com.pwr.warehousesystem.dto;

import lombok.Data;

@Data
public class EmployeeDTO {
    private Long id;
    private String employeeId;
    private String name;
    private String surname;
    private String function;
    private WarehouseDTO warehouse;
}
