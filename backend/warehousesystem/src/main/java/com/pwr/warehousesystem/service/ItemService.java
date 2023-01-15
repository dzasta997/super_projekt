package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Item;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getAll(){
        return itemRepository.findAll();
    }

    public Item getById(Long id){
        return itemRepository.findById(id).orElseThrow(ElementNotFoundException::new);
    }
    
    public Item saveItem(Item item){
        if ((item.getId() != null && itemRepository.existsById(item.getId())))
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

}
