package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Address;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.AddressRepository;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

class AddressServiceTest {

    @InjectMocks
    AddressService addressService;
    @Mock
    AddressRepository addressRepository;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void findByAddressIdPositiveScenario() {
        when(addressRepository.findById(anyLong())).thenReturn(Optional.of(getDBAddress()));
        assertEquals(addressService.findByAddressId(1L), getDBAddress());
    }

    @Test
    void findByAddressIdNegativeScenario() {
        when(addressRepository.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(ElementNotFoundException.class, () -> addressService.findByAddressId(2L));
    }

    @Test
    void saveAddressPositiveScenario() {
        when(addressRepository.existsById(anyLong())).thenReturn(true);
        when(addressRepository.save(getAddress())).thenReturn(getDBAddress());
        assertEquals(addressService.saveAddress(getAddress()), getDBAddress());
    }

    @Test
    void saveAddressNegativeScenario() {
        when(addressRepository.existsById(anyLong())).thenReturn(true);
        assertThrows(OperationFailedException.class, ()->addressService.saveAddress(getDBAddress()));
    }

    @Test
    void deleteByIdNegativeScenario() {
        when(addressRepository.existsById(anyLong())).thenReturn(false);
        assertThrows(OperationFailedException.class, ()->addressService.deleteById(2L));
    }

    private Address getAddress() {
        Address address = new Address();
        address.setCity("Wrocław");
        address.setZipcode("54-611");
        address.setStreet("Mickiewicza");
        address.setNumber("20");
        return address;
    }

    private Address getDBAddress() {
        Address address = getAddress();
        address.setId(1L);
        return address;
    }
}