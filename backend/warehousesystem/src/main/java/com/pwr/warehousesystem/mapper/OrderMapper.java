package com.pwr.warehousesystem.mapper;

import com.pwr.warehousesystem.dto.OrderDTO;
import com.pwr.warehousesystem.entity.Order;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper extends ApplicationMapper<Order, OrderDTO>{

    private final ClientMapper clientMapper;
    private final ItemMapper itemMapper;

    public OrderMapper(ClientMapper clientMapper, ItemMapper itemMapper) {
        this.clientMapper = clientMapper;
        this.itemMapper = itemMapper;
    }

    @Override
    public Order toEntity(OrderDTO orderDTO) {
        if(orderDTO==null){
            return null;
        }
        Order order = new Order();
        order.setId(orderDTO.getId());
        order.setOrderId(orderDTO.getOrderId());
        order.setOrderDate(orderDTO.getOrderDate());
        order.setClient(clientMapper.toEntity(orderDTO.getClient()));
        order.setItems(itemMapper.toEntity(orderDTO.getItems()));
        return order;
    }

    @Override
    public OrderDTO toDto(Order order) {
        if(order==null){
            return null;
        }
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setOrderId(order.getOrderId());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setClient(clientMapper.toDto(order.getClient()));
        orderDTO.setItems(itemMapper.toDto(order.getItems()));
        return orderDTO;
    }
}
