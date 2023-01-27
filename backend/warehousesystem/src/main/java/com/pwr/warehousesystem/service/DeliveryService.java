package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Delivery;
import com.pwr.warehousesystem.entity.ItemDelivery;
import com.pwr.warehousesystem.entity.Supplier;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.DeliveryRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final ItemService itemService;
    private final SupplierService supplierService;

    @Autowired
    public DeliveryService(DeliveryRepository deliveryRepository, ItemService itemService, SupplierService supplierService) {
        this.deliveryRepository = deliveryRepository;
        this.itemService = itemService;
        this.supplierService = supplierService;
    }

    public List<Delivery> getAll(){
        return deliveryRepository.findAll();
    }

    public List<Delivery> getAllByWarehouseId(long warehouseId){
        return deliveryRepository.getAllByWarehouseId(warehouseId);
    }

    public Delivery findByDeliveryId(long deliveryId){
        return deliveryRepository.findById(deliveryId).orElseThrow(ElementNotFoundException::new);
    }

    public Delivery saveDelivery(Delivery delivery) {
        if ((delivery.getId() != null && deliveryRepository.existsById(delivery.getId()))
        ) {
            throw new OperationFailedException();
        }

        if (delivery.getSupplier() != null && delivery.getSupplier().getId() != null) {
            supplierService.updateSupplier(delivery.getSupplier());
        } else if (delivery.getSupplier() != null) {
            Supplier savedSupplier = supplierService.saveSupplier(delivery.getSupplier());
            delivery.setSupplier(savedSupplier);
        }

        List<ItemDelivery> itemDeliveries = delivery.getItems();
        delivery.setItems(null);
        Delivery savedDelivery = deliveryRepository.save(delivery);

        itemDeliveries = updateItems(itemDeliveries, savedDelivery);

        savedDelivery.setItems(itemDeliveries);

        return savedDelivery;
    }

    public Delivery updateDelivery(Delivery delivery) {
        if (delivery.getId() == null) {
            throw new OperationFailedException();
        }

        if (delivery.getSupplier().getId() != null) {
            supplierService.updateSupplier(delivery.getSupplier());
        } else {
            Supplier savedSupplier = supplierService.saveSupplier(delivery.getSupplier());
            delivery.setSupplier(savedSupplier);
        }

        Delivery toUpdate = findByDeliveryId(delivery.getId());
        BeanUtils.copyProperties(delivery, toUpdate);
        toUpdate.setItems(null);
        Delivery savedDelivery = deliveryRepository.save(toUpdate);

        itemService.deleteItemDeliveriesByDeliveryId(savedDelivery.getId());
        List<ItemDelivery> items = updateItems(delivery.getItems(), toUpdate);
        savedDelivery.setItems(items);

        return savedDelivery;
    }

    private List<ItemDelivery> updateItems(List<ItemDelivery> itemDeliveries, Delivery savedDelivery) {
        return itemDeliveries.stream().map(it -> {
            it.setDelivery(savedDelivery);
            return itemService.saveItemDelivery(it);
        }).collect(Collectors.toList());
    }

    public void deleteDelivery(long deliveryId){
        if(!deliveryRepository.existsById(deliveryId)){
            throw new OperationFailedException();
        }
        deliveryRepository.deleteById(deliveryId);
    }
}
