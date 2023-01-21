package com.pwr.warehousesystem.mapper;

import java.util.List;
import java.util.stream.Collectors;

public abstract class   ApplicationMapper<ENTITY, DTO> {
    public abstract ENTITY toEntity(final DTO dto);

    public abstract DTO toDto(final ENTITY entity);

    public List<ENTITY> toEntity(final List<DTO> dtos) {
        if(dtos==null){
            return List.of();
        }
        return dtos.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    public List<DTO> toDto(final List<ENTITY> entities) {
        if(entities==null){
            return List.of();
        }
        return entities.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
