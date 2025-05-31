package com.ars.ecomm_api.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductVariantDto {
    private UUID id;

    @NotBlank(message = "Color is required")
    @Size(max = 10, message = "Color must not exceed 10 characters")
    private String color;

    @NotBlank(message = "Size is required")
    @Size(max = 4, message = "Size must not exceed 4 characters")
    private String size;

    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock quantity cannot be negative")
    @Max(value = 99999, message = "Stock quantity cannot exceed 99999")
    private Integer stockQuantity;
}
