package com.ars.ecomm_api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderItemRequest {
    private UUID productId;
    private UUID productVariantId;
    private Double discount;
    private Integer quantity;
}
