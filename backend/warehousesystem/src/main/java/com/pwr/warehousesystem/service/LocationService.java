package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.ItemLocation;
import com.pwr.warehousesystem.entity.Location;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.LocationRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationService {

    private final LocationRepository locationRepository;
    private final ItemService itemService;

    @Autowired
    public LocationService(LocationRepository locationRepository, @Lazy ItemService itemService) {
        this.locationRepository = locationRepository;
        this.itemService = itemService;
    }

    public List<Location> findAll() {
        return locationRepository.findAll();
    }

    public Location findByLocationId(long id) {
        return locationRepository.findById(id).orElseThrow(ElementNotFoundException::new);
    }

    public List<Location> findByWarehouseId(long warehouseId) {
        return locationRepository.findAllByWarehouseId(warehouseId);
    }

    public Location findByWarehouseIdAndRackAndAlley(long warehouseId, String rack, String alley) {
        return locationRepository.findByWarehouseIdAndRackAndAlley(warehouseId, rack, alley).orElseThrow(ElementNotFoundException::new);
    }

    public Location saveLocation(Location location) {
        if ((location.getId() != null && locationRepository.existsById(location.getId()))
        ) {
            throw new OperationFailedException();
        }
        return locationRepository.save(location);
    }

    public Location updateLocation(Location location) {
        if (location.getId() == null) {
            throw new OperationFailedException();
        }
        Location toUpdate = findByLocationId(location.getId());
        BeanUtils.copyProperties(location, toUpdate);
        List<ItemLocation> items = location.getItems();
        toUpdate.setItems(null);

        Location saved = locationRepository.save(toUpdate);
        itemService.deleteItemLocationsByLocationId(saved.getId());
        items = updateItems(items, saved);
        saved.setItems(items);

        return locationRepository.save(location);
    }

    private List<ItemLocation> updateItems(List<ItemLocation> items, Location svaedLocation) {
        return items.stream().map(it -> {
            it.setLocation(svaedLocation);
            return itemService.saveItemLocation(it);
        }).collect(Collectors.toList());
    }

    public void deleteLocation(long id) {
        if(!locationRepository.existsById(id)){
            throw new OperationFailedException();
        }
         locationRepository.deleteById(id);
    }




}
