package com.ars.ecomm_api.dto;


import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductResourceDto {
    private UUID id;

    @NotEmpty(message = "Name is required")
    @Size(max = 255, message = "name must not exceed 255 characters")
    private String name;

    @NotEmpty(message = "URL is required")
    @Size(max = 2048, message = "URL must not exceed 2048 characters")
    private String url;

    @NotNull
    private Boolean primary;

    @NotEmpty(message = "Type is required")
    private String type;
}
