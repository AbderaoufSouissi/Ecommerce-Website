package com.ars.ecomm_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequest {
    private UUID userId;
    private Date orderDate;
    private UUID addressId;
    private List<OrderItemRequest> orderItemRequests;
    private Double totalAmount;
    private Double discount;
    private String paymentMethod;
    private Date deliveryDate;






}
