package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Employee;
import com.pwr.warehousesystem.entity.User;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.repository.UserRepository;
import com.pwr.warehousesystem.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String getUserName(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    public String getRole(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getAuthorities().stream().findFirst().orElseThrow().getAuthority();
    }

    public long getEmployeeId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findById(((UserDetailsImpl)authentication.getPrincipal()).getId()).orElseThrow(ElementNotFoundException::new);
        return user.getEmployee().getId();
    }

    public User addUser(User user){
        Employee employee = new Employee();
        user.setEmployee(employee);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public List<User> getAll(){
        return userRepository.findAll();
    }
}
