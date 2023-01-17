package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.LocationDTO;
import com.pwr.warehousesystem.entity.Location;
import com.pwr.warehousesystem.mapper.LocationMapper;
import com.pwr.warehousesystem.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<LocationDTO>> getAllLocations(){
        List<Location> locations = locationService.findAll();
        return new ResponseEntity<>(locationMapper.toDto(locations, false), HttpStatus.OK);
    }

    @GetMapping("/{locationId}")
    public ResponseEntity<LocationDTO> getLocation(@PathVariable long locationId){
        Location location = locationService.findByLocationId(locationId);
        return new ResponseEntity<>(locationMapper.toDto(location, false), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LocationDTO> postLocation(@RequestBody LocationDTO locationDTO){
        Location savedLocation = locationService.saveLocation(locationMapper.toEntity(locationDTO));
        return new ResponseEntity<>(locationMapper.toDto(savedLocation, false), HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/{locationId}")
    public ResponseEntity<Void> deleteLocation(@PathVariable long locationId){
        locationService.deleteLocation(locationId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
