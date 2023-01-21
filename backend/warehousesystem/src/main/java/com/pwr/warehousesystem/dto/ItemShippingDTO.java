package com.pwr.warehousesystem.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ItemShippingDTO {
    private Long id;
    @NotNull
    private ItemDTO item;
    @NotNull
    private ShippingDTO shipping;
    private int quantity;
}
