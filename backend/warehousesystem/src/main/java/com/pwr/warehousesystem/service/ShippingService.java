package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Client;
import com.pwr.warehousesystem.entity.ItemShipping;
import com.pwr.warehousesystem.entity.Shipping;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.ShippingRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShippingService {

    private final ShippingRepository shippingRepository;
    private final ItemService itemService;

    private final ClientService clientService;

    @Autowired
    public ShippingService(ShippingRepository shippingRepository, ItemService itemService, ClientService clientService) {
        this.shippingRepository = shippingRepository;
        this.itemService = itemService;
        this.clientService = clientService;
    }

    public List<Shipping> getAllShippings(){
        return shippingRepository.findAll();
    }

    public List<Shipping> getAllByWarehouseId(long warehouseId){
        return shippingRepository.getAllByWarehouseId(warehouseId);
    }

    public Shipping getByShippingId(long shippingId){
        return shippingRepository.findById(shippingId).orElseThrow(ElementNotFoundException::new);
    }

    public Shipping saveShipping(Shipping shipping){
        if ((shipping.getId() != null && shippingRepository.existsById(shipping.getId()))) {
            throw new OperationFailedException();
        }

        if (shipping.getClient().getId() != null) {
            clientService.updateClient(shipping.getClient());
        } else {
            Client savedClient = clientService.saveClient(shipping.getClient());
            shipping.setClient(savedClient);
        }

        List<ItemShipping> itemShippings = shipping.getItems();
        shipping.setItems(null);
        Shipping savedShipping = shippingRepository.save(shipping);

        itemShippings = itemShippings.stream().map(it -> {
            it.setShipping(savedShipping);
            return itemService.saveItemShipping(it);
        }).collect(Collectors.toList());

        savedShipping.setItems(itemShippings);


        return savedShipping;
    }

    public void deleteShipping(long shippingId){
        if(!shippingRepository.existsById(shippingId)){
            throw new OperationFailedException();
        }
         shippingRepository.deleteById(shippingId);
    }

    public Shipping updateShipping(Shipping shipping) {
        if (shipping.getId() == null) {
            throw new OperationFailedException();
        }

        if (shipping.getClient().getId() != null) {
            clientService.updateClient(shipping.getClient());
        } else {
            Client savedClient = clientService.saveClient(shipping.getClient());
            shipping.setClient(savedClient);
        }

        Shipping toUpdate = getByShippingId(shipping.getId());
        BeanUtils.copyProperties(shipping, toUpdate);
        return shippingRepository.save(toUpdate);
    }
}
