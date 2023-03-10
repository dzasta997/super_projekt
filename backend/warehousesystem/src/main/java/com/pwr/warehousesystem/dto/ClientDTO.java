package com.pwr.warehousesystem.dto;

import lombok.Data;

import java.util.List;

@Data
public class ClientDTO {
    private Long id;
    private String name;
    private String description;
    private AddressDTO address;
}
