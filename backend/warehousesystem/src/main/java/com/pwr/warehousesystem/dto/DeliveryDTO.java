package com.pwr.warehousesystem.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class DeliveryDTO {
    private Long id;
    private String deliveryId;
    private Date deliveryDate;
    private SupplierDTO supplier;
    private List<ItemDTO> items;
}
