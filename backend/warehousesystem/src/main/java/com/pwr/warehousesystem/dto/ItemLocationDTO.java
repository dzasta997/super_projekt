package com.pwr.warehousesystem.dto;

import com.pwr.warehousesystem.enumeration.ItemSize;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ItemLocationDTO {
    private Long id;
    @NotNull
    private ItemDTO item;
    @NotNull
    private LocationDTO location;
    private int quantity;
}
