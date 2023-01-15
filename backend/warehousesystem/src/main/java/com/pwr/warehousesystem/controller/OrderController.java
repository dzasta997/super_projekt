package com.pwr.warehousesystem.controller;

import com.pwr.warehousesystem.dto.OrderDTO;
import com.pwr.warehousesystem.entity.Order;
import com.pwr.warehousesystem.mapper.OrderMapper;
import com.pwr.warehousesystem.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("orders")
public class OrderController {

    private final OrderService orderService;
    private final OrderMapper orderMapper;

    public OrderController(OrderService orderService, OrderMapper orderMapper) {
        this.orderService = orderService;
        this.orderMapper = orderMapper;
    }

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders(){
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orderMapper.toDto(orders), HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getByOrderId(@PathVariable String orderId){
        Order order = orderService.getByOrderId(orderId);
        return new ResponseEntity<>(orderMapper.toDto(order), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<OrderDTO> saveOrder(@RequestBody OrderDTO orderDTO){
        Order order = orderService.saveOrder(orderMapper.toEntity(orderDTO));
        return new ResponseEntity<>(orderMapper.toDto(order), HttpStatus.OK);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Long> deleteOrder(@PathVariable String orderId){
        Long deleted = orderService.deleteOrder(orderId);
        return new ResponseEntity<>(deleted, HttpStatus.OK);
    }
}
