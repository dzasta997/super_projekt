package com.pwr.warehousesystem.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @PostMapping("/success")
    public ResponseEntity<Void> success() {
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}
