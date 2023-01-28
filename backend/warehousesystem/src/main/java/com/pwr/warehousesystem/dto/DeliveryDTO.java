package com.pwr.warehousesystem.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class DeliveryDTO {
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date deliveryDate;
    private SupplierDTO supplier;
    private List<ItemDeliveryDTO> items;
    private WarehouseDTO warehouse;
    private EmployeeDTO employee;
    private String status;
}
