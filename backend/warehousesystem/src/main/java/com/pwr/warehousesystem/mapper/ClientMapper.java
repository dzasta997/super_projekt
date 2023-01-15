package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.ClientDTO;
import com.pwr.warehousesystem.entity.Client;
import org.springframework.stereotype.Component;

@Component
public class ClientMapper extends ApplicationMapper<Client, ClientDTO> {

    private final AddressMapper addressMapper;
    private final WarehouseMapper warehouseMapper;

    public ClientMapper(AddressMapper addressMapper, WarehouseMapper warehouseMapper) {
        this.addressMapper = addressMapper;
        this.warehouseMapper = warehouseMapper;
    }

    @Override
    public Client toEntity(ClientDTO clientDTO) {
        if(clientDTO==null){
            return null;
        }
        Client client = new Client();
        client.setId(clientDTO.getId());
        client.setClientId(clientDTO.getClientId());
        client.setName(clientDTO.getName());
        client.setDescription(clientDTO.getDescription());
        client.setAddress(addressMapper.toEntity(clientDTO.getAddress()));
        client.setWarehouses(warehouseMapper.toEntity(clientDTO.getWarehouses()));
        return client;
    }

    @Override
    public ClientDTO toDto(Client client) {
        if(client==null){
            return null;
        }
        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setId(client.getId());
        clientDTO.setClientId(client.getClientId());
        clientDTO.setName(client.getName());
        clientDTO.setDescription(client.getDescription());
        clientDTO.setAddress(addressMapper.toDto(client.getAddress()));
        clientDTO.setWarehouses(warehouseMapper.toDto(client.getWarehouses()));
        return  clientDTO;
    }
}
