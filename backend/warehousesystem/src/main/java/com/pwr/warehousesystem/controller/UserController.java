package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.entity.User;
import com.pwr.warehousesystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

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
    public ResponseEntity<String> getUsername(){
        return new ResponseEntity<>(userService.getUserName(), HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll(){
        List<User> users = userService.getAll();
        return new ResponseEntity<>(users, HttpStatus.OK);

    }
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user){
        User saved = userService.addUser(user);
        return new ResponseEntity<>(saved, HttpStatus.OK);
    }
}
