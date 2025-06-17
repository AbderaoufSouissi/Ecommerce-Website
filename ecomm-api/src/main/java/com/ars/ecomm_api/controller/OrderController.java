package com.ars.ecomm_api.controller;

import com.ars.ecomm_api.dto.request.OrderRequest;
import com.ars.ecomm_api.entity.Order;
import com.ars.ecomm_api.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;



    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest orderRequest, Principal principal) {
        return  new ResponseEntity<>(orderService.createOrder(orderRequest,principal), HttpStatus.CREATED);

    }
}
