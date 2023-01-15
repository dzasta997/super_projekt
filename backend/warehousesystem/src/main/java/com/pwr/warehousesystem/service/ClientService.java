package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Client;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.ClientRepository;
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

    public Client saveClient(Client client) {
        if ((client.getId() != null && clientRepository.existsById(client.getId()))
                || clientRepository.existsByClientId(client.getClientId())
        ) {
            throw new OperationFailedException();
        }
        return clientRepository.save(client);
    }

    public void deleteClient(long id){
        if(!clientRepository.existsById(id)){
            throw new OperationFailedException();
        }
        clientRepository.deleteById(id);
    }
}
