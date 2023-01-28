package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Address;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public List<Address> findAll() {
        return addressRepository.findAll();
    }

    public Address findByAddressId(long id) {
        return addressRepository.findById(id).orElseThrow(ElementNotFoundException::new);
    }

    public void deleteById(long id){
        if(!addressRepository.existsById(id)){
            throw new OperationFailedException();
        }
        addressRepository.deleteById(id);
    }
    public Address saveAddress(Address address) {
        if (address.getId() != null && addressRepository.existsById(address.getId())) {
            throw new OperationFailedException();
        }
        return addressRepository.save(address);
    }

    public void deleteAddress(long id) {
        addressRepository.deleteById(id);
    }

}
