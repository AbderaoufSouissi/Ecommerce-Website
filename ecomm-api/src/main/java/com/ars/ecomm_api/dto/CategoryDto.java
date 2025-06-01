package com.ars.ecomm_api.dto;


import jakarta.validation.constraints.NotBlank;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDto {
    private UUID id;

    @NotBlank(message = "Category name is required")
    @Size(min = 2, max = 100, message = "Category name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Category code is required")
    @Size(min = 2, max = 20, message = "Category code must be between 2 and 20 characters")
    private String code;

    @NotBlank(message = "Category description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;
    private List<CategoryTypeDto> categoryTypes;


}
