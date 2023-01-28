package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.LocationDTO;
import com.pwr.warehousesystem.entity.Location;
import com.pwr.warehousesystem.mapper.LocationMapper;
import com.pwr.warehousesystem.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/locations")
public class LocationController {

    private final LocationService locationService;
    private final LocationMapper locationMapper;

    @Autowired
    public LocationController(LocationService locationService, LocationMapper locationMapper) {
        this.locationService = locationService;
        this.locationMapper = locationMapper;
    }

    @GetMapping
    public ResponseEntity<List<LocationDTO>> getAllLocations() {
        List<Location> locations = locationService.findAll();
        return new ResponseEntity<>(locationMapper.toDto(locations, false), HttpStatus.OK);
    }

    @GetMapping("/warehouse/{id}")
    public ResponseEntity<List<LocationDTO>> getAllLocationsByWarehouseId(@PathVariable long id) {
        List<Location> locations = locationService.findByWarehouseId(id);
        return new ResponseEntity<>(locationMapper.toDto(locations, false), HttpStatus.OK);
    }

    @GetMapping("/warehouse/{id}/rack/{rack}/alley/{alley}")
    public ResponseEntity<LocationDTO> getLocationByWarehouseIdAndRackAndAlley(@PathVariable long id,
                                                                               @PathVariable String rack,
                                                                               @PathVariable String alley) {
        Location location = locationService.findByWarehouseIdAndRackAndAlley(id, rack, alley);
        return new ResponseEntity<>(locationMapper.toDto(location, false), HttpStatus.OK);
    }

    @GetMapping("/{locationId}")
    public ResponseEntity<LocationDTO> getLocation(@PathVariable long locationId) {
        Location location = locationService.findByLocationId(locationId);
        return new ResponseEntity<>(locationMapper.toDto(location, false), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<LocationDTO> postLocation(@RequestBody LocationDTO locationDTO) {
        Location savedLocation = locationService.saveLocation(locationMapper.toEntity(locationDTO));
        return new ResponseEntity<>(locationMapper.toDto(savedLocation, false), HttpStatus.OK);
    }

    @Transactional
    @PutMapping
    public ResponseEntity<LocationDTO> updateLocation(@RequestBody LocationDTO locationDTO) {
        Location savedLocation = locationService.updateLocation(locationMapper.toEntity(locationDTO));
        return new ResponseEntity<>(locationMapper.toDto(savedLocation, false), HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/{locationId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteLocation(@PathVariable long locationId) {
        locationService.deleteLocation(locationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
