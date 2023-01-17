package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.ClientDTO;
import com.pwr.warehousesystem.entity.Client;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper extends ApplicationMapper<Client, ClientDTO> {

    private final AddressMapper addressMapper;

    public ClientMapper(AddressMapper addressMapper) {
        this.addressMapper = addressMapper;
    }

    @Override
    public Client toEntity(ClientDTO clientDTO) {
        if(clientDTO==null){
            return null;
        }
        Client client = new Client();
        client.setId(clientDTO.getId());
        client.setName(clientDTO.getName());
        client.setDescription(clientDTO.getDescription());
        client.setAddress(addressMapper.toEntity(clientDTO.getAddress()));

        return client;
    }

    @Override
    public ClientDTO toDto(Client client) {
        if(client==null){
            return null;
        }
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setId(client.getId());
        clientDTO.setName(client.getName());
        clientDTO.setDescription(client.getDescription());
        clientDTO.setAddress(addressMapper.toDto(client.getAddress()));

        return  clientDTO;
    }
}
