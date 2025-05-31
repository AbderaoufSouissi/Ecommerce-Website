package com.ars.ecomm_api.service;

import com.ars.ecomm_api.dto.CategoryDto;
import com.ars.ecomm_api.entity.Category;

import java.util.List;
import java.util.UUID;

public interface CategoryService {
    Category getCategory(UUID categoryId);
    Category createCategory(CategoryDto categoryDto);
    List<Category> getAllCategories();
    Category updateCategory(CategoryDto categoryDto, UUID categoryId);
}
