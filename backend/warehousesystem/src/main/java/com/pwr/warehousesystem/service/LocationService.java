package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Location;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Location> findByLocationId(String locationId) {
        return locationRepository.findByLocationId(locationId);
    }

    public Location saveLocation(Location location) {
        if ((location.getId() != null && locationRepository.existsById(location.getId()))
                || locationRepository.existsByLocationId(location.getLocationId())
        ) {
            throw new OperationFailedException();
        }
        return locationRepository.save(location);
    }

    public long deleteLocation(String locationId) {
        return locationRepository.deleteByLocationId(locationId);
    }


}
