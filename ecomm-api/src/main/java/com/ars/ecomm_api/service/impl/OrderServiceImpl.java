package com.ars.ecomm_api.service.impl;

import com.ars.ecomm_api.auth.entity.AppUser;
import com.ars.ecomm_api.dto.request.OrderItemRequest;
import com.ars.ecomm_api.dto.request.OrderRequest;
import com.ars.ecomm_api.entity.*;
import com.ars.ecomm_api.enumeration.OrderStatus;
import com.ars.ecomm_api.enumeration.PaymentStatus;
import com.ars.ecomm_api.repository.OrderRepository;
import com.ars.ecomm_api.service.OrderService;
import com.ars.ecomm_api.service.ProductService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final UserDetailsService userDetailsService;
    private final ProductService productService;
    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public Order createOrder(OrderRequest orderRequest, Principal principal){
        AppUser user = (AppUser) userDetailsService.loadUserByUsername(principal.getName());
        Address address = user
                .getAddressList()
                .stream().
                filter((add) -> orderRequest.getAddressId().equals(add.getId()))
                .findFirst()
                .orElseThrow(()-> new RuntimeException());

        Order order = Order.builder()
                .orderDate(orderRequest.getOrderDate())
                .user(user)
                .address(address)
                .totalAmount(orderRequest.getTotalAmount())
                .discount(orderRequest.getDiscount())
                .deliveryDate(orderRequest.getDeliveryDate())
                .paymentMethod(orderRequest.getPaymentMethod())
                .orderStatus(OrderStatus.PENDING)

                .build();
        List<OrderItem> orderItems = orderRequest.getOrderItemRequests().stream().map(orderItemRequest->{
                try{
                    Product product = productService.fetchProductById(orderItemRequest.getProductId());
                    OrderItem orderItem = OrderItem.builder()
                            .product(product)
                            .productVariantId(orderItemRequest.getProductVariantId())
                            .quantity(orderItemRequest.getQuantity())
                            .order(order)
                            .build();
                    return orderItem;

                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
        }).toList();
        order.setOrderItems(orderItems);
        Payment payment = Payment.builder()
                .paymentStatus(PaymentStatus.PENDING)
                .paymentDate(new Date())
                .order(order)
                .amount(order.getTotalAmount())
                .paymentMethod(order.getPaymentMethod())
                .build();
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setPaymentDate(new Date());
        payment.setOrder(order);
        payment.setAmount(order.getTotalAmount());
        payment.setPaymentMethod("");
        order.setPayment(payment);
        return orderRepository.save(order);





    }
}
