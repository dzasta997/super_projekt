package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.LocationDTO;
import com.pwr.warehousesystem.entity.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Component
public class LocationMapper extends ApplicationMapperIgnoreNested<Location, LocationDTO> {

    private final WarehouseMapper warehouseMapper;
    private final ItemLocationMapper itemLocationMapper;

    @Autowired
    public LocationMapper(WarehouseMapper warehouseMapper, @Lazy ItemLocationMapper itemLocationMapper) {
        this.warehouseMapper = warehouseMapper;
        this.itemLocationMapper = itemLocationMapper;
    }

    @Override
    public Location toEntity(LocationDTO locationDTO) {
        if(locationDTO==null){
            return null;
        }
        Location location = new Location();
        location.setId(locationDTO.getId());
        location.setRack(locationDTO.getRack());
        location.setAlley(locationDTO.getAlley());
        location.setCapacity(locationDTO.getCapacity());
        location.setAvailability(locationDTO.getAvailability());
        location.setDescription(locationDTO.getDescription());
        location.setWarehouse(warehouseMapper.toEntity(locationDTO.getWarehouse()));
        location.setItems(itemLocationMapper.toEntity(locationDTO.getItems()));

        return location;
    }

    @Override
    public LocationDTO toDto(Location location, boolean ignoreNested) {
        if(location==null){
            return null;
        }
        LocationDTO locationDTO = new LocationDTO();
        locationDTO.setId(location.getId());
        locationDTO.setRack(location.getRack());
        locationDTO.setAlley(location.getAlley());
        locationDTO.setCapacity(location.getCapacity());
        locationDTO.setAvailability(location.getAvailability());
        locationDTO.setDescription(location.getDescription());
        locationDTO.setWarehouse(warehouseMapper.toDto(location.getWarehouse()));
        if (!ignoreNested) {
            locationDTO.setItems(itemLocationMapper.toDto(location.getItems(), true));
        }
        return locationDTO;
    }
}
