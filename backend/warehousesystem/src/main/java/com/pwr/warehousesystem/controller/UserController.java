package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.entity.User;
import com.pwr.warehousesystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("permitAll()")
    public ResponseEntity<String> getUsername() {
        return new ResponseEntity<>(userService.getUserName(), HttpStatus.OK);
    }

    @GetMapping("/role")
    @PreAuthorize("permitAll()")
    public ResponseEntity<String> getRole() {
        return new ResponseEntity<>(userService.getRole(), HttpStatus.OK);
    }

    @GetMapping("/employee")
    @PreAuthorize("permitAll()")
    public ResponseEntity<Long> getEmployeeId() {
        return new ResponseEntity<>(userService.getEmployeeId(), HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<User>> getAll() {
        List<User> users = userService.getAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User saved = userService.addUser(user);
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }

}
