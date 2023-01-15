package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Delivery;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.DeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    @Autowired
    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    public List<Delivery> getAll(){
        return deliveryRepository.findAll();
    }

    public Delivery findByDeliveryId(String deliveryId){
        return deliveryRepository.findByDeliveryId(deliveryId).orElseThrow(ElementNotFoundException::new);
    }

    public Delivery saveDelivery(Delivery delivery) {
        if ((delivery.getId() != null && deliveryRepository.existsById(delivery.getId()))
                || deliveryRepository.existsByDeliveryId(delivery.getDeliveryId())
        ) {
            throw new OperationFailedException();
        }
        return deliveryRepository.save(delivery);
    }

    public long deleteDelivery(String deliveryId){
        if(!deliveryRepository.existsByDeliveryId(deliveryId)){
            throw new OperationFailedException();
        }
        return deliveryRepository.deleteByDeliveryId(deliveryId);
    }
}
