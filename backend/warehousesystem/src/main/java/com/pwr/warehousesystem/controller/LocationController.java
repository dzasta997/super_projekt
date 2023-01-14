package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.entity.Location;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("location")
public class LocationController {

    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations(){
        List<Location> locations = locationService.findAll();
        return new ResponseEntity<>(locations, HttpStatus.OK);
    }

    @GetMapping("/{locationId}")
    public ResponseEntity<Location> getLocation(@PathVariable String locationId){
        Location location = locationService.findByLocationId(locationId).orElseThrow(ElementNotFoundException::new);
        return new ResponseEntity<>(location, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Location> postLocation(@RequestBody Location location){
        Location savedLocation = locationService.saveLocation(location);
        return new ResponseEntity<>(savedLocation, HttpStatus.OK);
    }

    @DeleteMapping("/{locationId}")
    public ResponseEntity<Long> deleteLocation(String locationId){
        long deleted = locationService.deleteLocation(locationId);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }

}
