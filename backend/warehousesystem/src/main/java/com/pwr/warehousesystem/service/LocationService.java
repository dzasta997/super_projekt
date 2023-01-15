package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Location;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    @Autowired
    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> findAll() {
        return locationRepository.findAll();
    }

    public Location findByLocationId(String locationId) {
        return locationRepository.findByLocationId(locationId).orElseThrow(ElementNotFoundException::new);
    }

    public Location saveLocation(Location location) {
        if ((location.getId() != null && locationRepository.existsById(location.getId()))
                || locationRepository.existsByLocationId(location.getLocationId())
        ) {
            throw new OperationFailedException();
        }
        return locationRepository.save(location);
    }

    public void deleteLocation(String locationId) {
        if(!locationRepository.existsByLocationId(locationId)){
            throw new OperationFailedException();
        }
         locationRepository.deleteByLocationId(locationId);
    }


}
