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
        address.setNumber(addressDTO.getNumber());
        address.setZipcode(addressDTO.getZipcode());
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
        addressDTO.setStreet(address.getStreet());
        addressDTO.setNumber(address.getNumber());
        addressDTO.setZipcode(address.getZipcode());
        return addressDTO;
    }
}
