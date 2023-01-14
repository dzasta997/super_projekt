package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.AddressDTO;
import com.pwr.warehousesystem.entity.Address;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper extends ApplicationMapper<Address, AddressDTO> {
    @Override
    public Address toEntity(AddressDTO addressDTO) {
        if(addressDTO==null){
            return null;
        }
        Address address = new Address();
        address.setId(addressDTO.getId());
        address.setCity(addressDTO.getCity());
        address.setStreet(addressDTO.getStreet());
        address.setNumber(address.getNumber());
        address.setZipcode(address.getZipcode());
        return address;
    }

    @Override
    public AddressDTO toDto(Address address) {
        if(address==null){
            return null;
        }
        AddressDTO addressDTO = new AddressDTO();
        addressDTO.setId(address.getId());
        addressDTO.setCity(address.getCity());
        addressDTO.setCity(address.getCity());
        addressDTO.setStreet(addressDTO.getStreet());
        addressDTO.setNumber(address.getNumber());
        addressDTO.setZipcode(address.getZipcode());
        return addressDTO;
    }
}
