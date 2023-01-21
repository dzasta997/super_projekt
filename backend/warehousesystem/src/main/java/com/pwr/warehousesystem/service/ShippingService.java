package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.ItemShipping;
import com.pwr.warehousesystem.entity.Shipping;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.ShippingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShippingService {

    private final ShippingRepository shippingRepository;
    private final ItemService itemService;

    @Autowired
    public ShippingService(ShippingRepository shippingRepository, ItemService itemService) {
        this.shippingRepository = shippingRepository;
        this.itemService = itemService;
    }

    public List<Shipping> getAllShippings(){
        return shippingRepository.findAll();
    }

    public Shipping getByShippingId(long shippingId){
        return shippingRepository.findById(shippingId).orElseThrow(ElementNotFoundException::new);
    }

    public Shipping saveShipping(Shipping shipping){
        if ((shipping.getId() != null && shippingRepository.existsById(shipping.getId()))) {
            throw new OperationFailedException();
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
}
