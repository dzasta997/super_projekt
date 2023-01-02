package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.entity.Client;
import com.pwr.warehousesystem.entity.Employee;
import com.pwr.warehousesystem.entity.Warehouse;
import com.pwr.warehousesystem.repository.ClientRepository;
import com.pwr.warehousesystem.repository.EmployeeRepository;
import com.pwr.warehousesystem.repository.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ExampleController {

    @Autowired
    ClientRepository clientRepository;

    @Autowired
    WarehouseRepository warehouseRepository;

    @GetMapping("/get")
    public List<Client> get() {
        return clientRepository.findAll();
    }

    @GetMapping("/add")
    public int add() {
        Warehouse warehouse = new Warehouse();
        warehouse.setWarehouseId("1we");
        Client client1 = new Client();
        client1.setClientId("abc");
        client1.setWarehouses(List.of(warehouse));
        Client client2 = new Client();
        client2.setClientId("abc2");
        client2.setWarehouses(List.of(warehouse));
        warehouseRepository.save(warehouse);
        clientRepository.save(client1);
        clientRepository.save(client2);
        return 0;
    }

}
