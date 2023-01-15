package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.AddressDTO;
import com.pwr.warehousesystem.entity.Address;
import com.pwr.warehousesystem.mapper.AddressMapper;
import com.pwr.warehousesystem.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("addresses")
public class AddressController {

    private final AddressService addressService;
    private final AddressMapper addressMapper;

    @Autowired
    public AddressController(AddressService addressService, AddressMapper addressMapper) {
        this.addressService = addressService;
        this.addressMapper = addressMapper;
    }

    @GetMapping
    public ResponseEntity<List<AddressDTO>> getAllAddresses(){
        List<Address> addresses = addressService.findAll();
        return new ResponseEntity<>(addressMapper.toDto(addresses), HttpStatus.OK);
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<AddressDTO> getAddress(@PathVariable long id){
        Address address = addressService.findByAddressId(id);
        return new ResponseEntity<>(addressMapper.toDto(address), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AddressDTO> postAddress(@RequestBody AddressDTO addressDTO){
        Address addressSaved = addressService.saveAddress(addressMapper.toEntity(addressDTO));
        return new ResponseEntity<>(addressMapper.toDto(addressSaved), HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity deleteAddress(@PathVariable long id){
        addressService.deleteAddress(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
