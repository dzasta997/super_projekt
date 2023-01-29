package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Delivery;
import com.pwr.warehousesystem.entity.Warehouse;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.DeliveryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

class DeliveryServiceTest {

    @InjectMocks
    DeliveryService deliveryService;
    @Mock
    DeliveryRepository deliveryRepository;
    private final DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
    private final Date date = dateFormat.parse("02/02/2022");

    DeliveryServiceTest() throws ParseException {
    }

    @BeforeEach
    public void init(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllPositiveScenario()  {
        when(deliveryRepository.findAll()).thenReturn(getDeliveryList());
        assertEquals(deliveryService.getAll(), getDeliveryList());
    }

    @Test
    void getAllByWarehouseIdPositiveScenario(){
        when(deliveryRepository.getAllByWarehouseId(1L)).thenReturn(List.of(getDBDelivery()));
        assertEquals(deliveryService.getAllByWarehouseId(1L), getDeliveryList());
    }

    @Test
    void findByDeliveryIdPositiveScenario() {
        when(deliveryRepository.findById(1L)).thenReturn(Optional.of(getDBDelivery()));
        assertEquals(deliveryService.findByDeliveryId(1L), getDBDelivery());
    }

    @Test
    void findByDeliveryIdNegativeScenario() {
        when(deliveryRepository.findById(2L)).thenReturn(Optional.empty());
        assertThrows(ElementNotFoundException.class, ()->deliveryService.findByDeliveryId(2L));
    }

    @Test
    void saveDeliveryPositiveScenario() {
        when(deliveryRepository.existsById(anyLong())).thenReturn(false);
        when(deliveryRepository.save(any())).thenReturn(getDBDelivery());
        assertEquals(deliveryService.saveDelivery(getDelivery()), getDBDelivery());
    }

    @Test
    void saveDeliveryNegativeScenario() {
        when(deliveryRepository.existsById(anyLong())).thenReturn(true);
       assertThrows(OperationFailedException.class, ()->deliveryService.saveDelivery(getDBDelivery()));
         }

    @Test
    void updateDeliveryNegativeScenario() {
        assertThrows(OperationFailedException.class, ()->deliveryService.updateDelivery(getDelivery()));
    }

    @Test
    void deleteDeliveryNegativeScenario() {
        when(deliveryRepository.existsById(anyLong())).thenReturn(false);
        assertThrows(OperationFailedException.class, ()->deliveryService.deleteDelivery(2L));
    }

    private Delivery getDelivery() {
        Delivery delivery = new Delivery();
        delivery.setDeliveryDate(date);
        delivery.setItems(new ArrayList<>());
        delivery.setStatus("IN PROGRESS");
        delivery.setWarehouse(getDBWarehouse());
        return delivery;
    }

    private Delivery getDBDelivery(){
        Delivery delivery = getDelivery();
        delivery.setId(1L);
        return delivery;
    }

    private Warehouse getDBWarehouse(){
        Warehouse warehouse = new Warehouse();
        warehouse.setId(1L);
        warehouse.setWarehouseName("WRO_1");
        return warehouse;
    }

    private List<Delivery> getDeliveryList() {
        return List.of(getDBDelivery());
    }


}