package com.pwr.warehousesystem.mapper;

import java.util.List;
import java.util.stream.Collectors;

public abstract class ApplicationMapperIgnoreNested<ENTITY, DTO> {
    public abstract ENTITY toEntity(final DTO dto);

    public abstract DTO toDto(final ENTITY entity, boolean ignoreNested);

    public List<ENTITY> toEntity(final List<DTO> dtos) {
        if(dtos==null){
            return List.of();
        }
        return dtos.stream()
                .map(dto -> toEntity(dto))
                .collect(Collectors.toList());
    }

    public List<DTO> toDto(final List<ENTITY> entities, boolean ignoreNested) {
        if(entities==null){
            return List.of();
        }
        return entities.stream()
                .map(entity -> toDto(entity, ignoreNested))
                .collect(Collectors.toList());
    }
}
