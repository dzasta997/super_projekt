package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Client;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.ClientRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {
    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    public List<Client> findAllClients(){
        return clientRepository.findAll();
    }

    public Client findByName(String name){
        return clientRepository.findByName(name).orElseThrow(ElementNotFoundException::new);
    }

    public Client findById(long id){
        return clientRepository.findById(id).orElseThrow(ElementNotFoundException::new);
    }

    public Client saveClient(Client client) {
        if ((client.getId() != null && clientRepository.existsById(client.getId()))) {
            throw new OperationFailedException();
        }
        return clientRepository.save(client);
    }

    public Client updateClient(Client client) {
        Client oldClient = findById(client.getId());
        BeanUtils.copyProperties(client, oldClient);
        return clientRepository.save(oldClient);
    }

    public void deleteClient(long id){
        if(!clientRepository.existsById(id)){
            throw new OperationFailedException();
        }
        clientRepository.deleteById(id);
    }

    public List<Client> findAllByWarehouseId(long warehouseId) {
        return clientRepository.findAllByWarehouseId(warehouseId);
    }
}
