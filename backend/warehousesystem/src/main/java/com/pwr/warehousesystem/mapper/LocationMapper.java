package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.LocationDTO;
import com.pwr.warehousesystem.entity.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LocationMapper extends ApplicationMapper<Location, LocationDTO> {

    private final WarehouseMapper warehouseMapper;
    private final ItemMapper itemMapper;

    @Autowired
    public LocationMapper(WarehouseMapper warehouseMapper, ItemMapper itemMapper) {
        this.warehouseMapper = warehouseMapper;
        this.itemMapper = itemMapper;
    }

    @Override
    public Location toEntity(LocationDTO locationDTO) {
        if(locationDTO==null){
            return null;
        }
        Location location = new Location();
        location.setId(locationDTO.getId());
        location.setLocationId(locationDTO.getLocationId());
        location.setRack(locationDTO.getRack());
        location.setAlley(locationDTO.getAlley());
        location.setCapacity(locationDTO.getCapacity());
        location.setAvailability(locationDTO.getAvailability());
        location.setDescription(locationDTO.getDescription());
        location.setWarehouse(warehouseMapper.toEntity(locationDTO.getWarehouse()));
        location.setItems(itemMapper.toEntity(locationDTO.getItems()));
        return location;
    }

    @Override
    public LocationDTO toDto(Location location) {
        if(location==null){
            return null;
        }
        LocationDTO locationDTO = new LocationDTO();
        locationDTO.setId(location.getId());
        locationDTO.setLocationId(location.getLocationId());
        locationDTO.setRack(location.getRack());
        locationDTO.setAlley(location.getAlley());
        locationDTO.setCapacity(location.getCapacity());
        locationDTO.setAvailability(location.getAvailability());
        locationDTO.setDescription(location.getDescription());
        locationDTO.setWarehouse(warehouseMapper.toDto(location.getWarehouse()));
        locationDTO.setItems(itemMapper.toDto(location.getItems()));
        return locationDTO;
    }
}
