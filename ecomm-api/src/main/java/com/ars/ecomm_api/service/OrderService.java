package com.ars.ecomm_api.service;

import com.ars.ecomm_api.dto.request.OrderRequest;
import com.ars.ecomm_api.entity.Order;


import java.security.Principal;

public interface OrderService {
    Order createOrder(OrderRequest orderRequest, Principal principal);
}
