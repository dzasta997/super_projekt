package com.pwr.warehousesystem.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ItemDeliveryDTO {
    private Long id;
    @NotNull
    private ItemDTO item;
    @NotNull
    private DeliveryDTO delivery;
    private int quantity;
}
