package com.pwr.warehousesystem.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class OrderDTO {

    private Long id;
    private String orderId;
    private Date orderDate;
    private ClientDTO client;
    private List<ItemDTO> items;

}
