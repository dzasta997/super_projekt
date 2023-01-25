package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.ClientDTO;
import com.pwr.warehousesystem.entity.Client;
import com.pwr.warehousesystem.mapper.ClientMapper;
import com.pwr.warehousesystem.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("clients")
public class ClientController {

    private final ClientService clientService;
    private final ClientMapper clientMapper;

    @Autowired
    public ClientController(ClientService clientService, ClientMapper clientMapper) {
        this.clientService = clientService;
        this.clientMapper = clientMapper;
    }

    @GetMapping
    public ResponseEntity<List<ClientDTO>> getAllClients() {
        List<Client> clients = clientService.findAllClients();
        return new ResponseEntity<>(clientMapper.toDto(clients), HttpStatus.OK);
    }

    @GetMapping("/{name}")
    public ResponseEntity<ClientDTO> getClientByName(@PathVariable String name) {
        Client client = clientService.findByName(name);
        return new ResponseEntity<>(clientMapper.toDto(client), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<ClientDTO> postClient(@RequestBody ClientDTO clientDTO) {
        Client savedClient = clientService.saveClient(clientMapper.toEntity(clientDTO));
        return new ResponseEntity<>(clientMapper.toDto(savedClient), HttpStatus.OK);
    }


    @Transactional
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('MANAGER') or hasRole('ADMIN')")
    public ResponseEntity<Void> deleteClient(@PathVariable long id) {
        clientService.deleteClient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/warehouse/{id}")
    public ResponseEntity<List<ClientDTO>> getAllClientsByWarehouseId(@PathVariable long id) {
        List<Client> clients = clientService.findAllByWarehouseId(id);
        return new ResponseEntity<>(clientMapper.toDto(clients), HttpStatus.OK);
    }
}
