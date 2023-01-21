package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.*;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.NotEnoughSpaceException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.ItemDeliveryRepository;
import com.pwr.warehousesystem.repository.ItemLocationRepository;
import com.pwr.warehousesystem.repository.ItemRepository;
import com.pwr.warehousesystem.repository.ItemShippingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepository itemRepository;
    private final ItemLocationRepository itemLocationRepository;
    private final ItemDeliveryRepository itemDeliveryRepository;
    private final ItemShippingRepository itemShippingRepository;
    private final LocationService locationService;

    @Autowired
    public ItemService(ItemRepository itemRepository, ItemLocationRepository itemLocationRepository, ItemDeliveryRepository itemDeliveryRepository, ItemShippingRepository itemShippingRepository, LocationService locationService) {
        this.itemRepository = itemRepository;
        this.itemLocationRepository = itemLocationRepository;
        this.itemDeliveryRepository = itemDeliveryRepository;
        this.itemShippingRepository = itemShippingRepository;
        this.locationService = locationService;
    }

    public List<Item> getAll(){
        return itemRepository.findAll();
    }

    public Item getById(Long id){
        return itemRepository.findById(id).orElseThrow(ElementNotFoundException::new);
    }
    
    public Item saveItem(Item item){
        if (itemRepository.existsById(item.getCode()))
        {
            throw new OperationFailedException();
        }
        return itemRepository.save(item);
    }

    public void deleteItem(Long id){
        if(!itemRepository.existsById(id)){
            throw new OperationFailedException();
        }
        itemRepository.deleteById(id);
    }

    public ItemLocation saveItemLocation(ItemLocation itemLocation) {
        if ((itemLocation.getId() != null && itemLocationRepository.existsById(itemLocation.getId()))
                || itemLocation.getItem().getCode() == null || itemLocation.getLocation().getId() == null
        ) {
            throw new OperationFailedException();
        }

        checkCapacity(itemLocation);

        return itemLocationRepository.save(itemLocation);
    }

    private void checkCapacity(ItemLocation itemLocation) {
        Item item = this.getById(itemLocation.getItem().getCode());
        Location location = locationService.findByLocationId(itemLocation.getLocation().getId());

        int takenCapacity = location.getItems().stream()
                .mapToInt(it -> it.getItem().getSize().size * it.getQuantity())
                .sum();
        takenCapacity = takenCapacity + itemLocation.getQuantity() * item.getSize().size;

        if (takenCapacity > location.getCapacity()) {
            throw new NotEnoughSpaceException();
        }

        itemLocation.setItem(item);
        itemLocation.setLocation(location);
    }

    public List<ItemLocation> getItemLocationsByItemCode(long code){
        return itemLocationRepository.findAllByItemCode(code);
    }

    public ItemDelivery saveItemDelivery(ItemDelivery itemDelivery) {
        if ((itemDelivery.getId() != null && itemLocationRepository.existsById(itemDelivery.getId()))
        ) {
            throw new OperationFailedException();
        }

        return itemDeliveryRepository.save(itemDelivery);
    }

    public ItemShipping saveItemShipping(ItemShipping itemShipping) {
        if ((itemShipping.getId() != null && itemLocationRepository.existsById(itemShipping.getId()))
        ) {
            throw new OperationFailedException();
        }

        return itemShippingRepository.save(itemShipping);
    }

}
