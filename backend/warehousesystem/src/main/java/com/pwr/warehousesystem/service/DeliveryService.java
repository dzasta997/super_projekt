package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Delivery;
import com.pwr.warehousesystem.entity.ItemDelivery;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final ItemService itemService;

    @Autowired
    public DeliveryService(DeliveryRepository deliveryRepository, ItemService itemService) {
        this.deliveryRepository = deliveryRepository;
        this.itemService = itemService;
    }

    public List<Delivery> getAll(){
        return deliveryRepository.findAll();
    }

    public Delivery findByDeliveryId(long deliveryId){
        return deliveryRepository.findById(deliveryId).orElseThrow(ElementNotFoundException::new);
    }

    public Delivery saveDelivery(Delivery delivery) {
        if ((delivery.getId() != null && deliveryRepository.existsById(delivery.getId()))
        ) {
            throw new OperationFailedException();
        }

        List<ItemDelivery> itemDeliveries = delivery.getItems();
        delivery.setItems(null);
        Delivery savedDelivery = deliveryRepository.save(delivery);

        itemDeliveries = itemDeliveries.stream().map(it -> {
            it.setDelivery(savedDelivery);
            return itemService.saveItemDelivery(it);
        }).collect(Collectors.toList());

        savedDelivery.setItems(itemDeliveries);

        return savedDelivery;
    }

    public void deleteDelivery(long deliveryId){
        if(!deliveryRepository.existsById(deliveryId)){
            throw new OperationFailedException();
        }
        deliveryRepository.deleteById(deliveryId);
    }
}
