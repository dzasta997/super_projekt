package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.LocationDTO;
import com.pwr.warehousesystem.entity.Location;
import com.pwr.warehousesystem.mapper.LocationMapper;
import com.pwr.warehousesystem.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
        return new ResponseEntity<>(locationMapper.toDto(locations), HttpStatus.OK);
    }

    @GetMapping("/{locationId}")
    public ResponseEntity<LocationDTO> getLocation(@PathVariable String locationId){
        Location location = locationService.findByLocationId(locationId);
        return new ResponseEntity<>(locationMapper.toDto(location), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<LocationDTO> postLocation(@RequestBody LocationDTO locationDTO){
        Location savedLocation = locationService.saveLocation(locationMapper.toEntity(locationDTO));
        return new ResponseEntity<>(locationMapper.toDto(savedLocation), HttpStatus.OK);
    }

    @DeleteMapping("/{locationId}")
    public ResponseEntity<Long> deleteLocation(@PathVariable String locationId){
        long deleted = locationService.deleteLocation(locationId);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }

}
