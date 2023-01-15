package com.pwr.warehousesystem.service;

import com.pwr.warehousesystem.entity.Order;
import com.pwr.warehousesystem.exception.ElementNotFoundException;
import com.pwr.warehousesystem.exception.OperationFailedException;
import com.pwr.warehousesystem.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders(){
        return orderRepository.findAll();
    }

    public Order getByOrderId(String orderId){
        return orderRepository.getByOrderId(orderId).orElseThrow(ElementNotFoundException::new);
    }

    public Order saveOrder(Order order){
        if ((order.getId() != null && orderRepository.existsById(order.getId()))
                || orderRepository.existsByOrderId(order.getOrderId())
        ) {
            throw new OperationFailedException();
        }
        return orderRepository.save(order);
    }

    public void deleteOrder(String orderId){
        if(!orderRepository.existsByOrderId(orderId)){
            throw new OperationFailedException();
        }
         orderRepository.deleteByOrderId(orderId);
    }
}
