package com.ars.ecomm_api.service.impl;

import com.ars.ecomm_api.dto.CategoryDto;
import com.ars.ecomm_api.entity.Category;
import com.ars.ecomm_api.entity.CategoryType;
import com.ars.ecomm_api.exception.ResourceNotFoundException;
import com.ars.ecomm_api.mapper.CategoryMapper;
import com.ars.ecomm_api.mapper.CategoryTypeMapper;
import com.ars.ecomm_api.repository.CategoryRepository;
import com.ars.ecomm_api.service.CategoryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;
    private final CategoryTypeMapper categoryTypeMapper;

    @Override
    public Category getCategory(UUID categoryId) {
        return categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));
    }

    @Override
    public Category createCategory(CategoryDto categoryDto) {

        Category newCategory = categoryMapper.toCategory(categoryDto);
        return categoryRepository.save(newCategory);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    @Transactional
    public Category updateCategory(CategoryDto categoryDto, UUID categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        category.setCode(categoryDto.getCode());
        if (categoryDto.getCategoryTypes() != null) {
            // Clear the existing collection (this will trigger orphan removal for removed items)
            category.getCategoryTypes().clear();

            // Convert DTOs to entities and set up bidirectional relationship
            List<CategoryType> newCategoryTypes = categoryTypeMapper.toCategoryTypes(categoryDto.getCategoryTypes());

            // Set the parent reference and add to the managed collection
            for (CategoryType categoryType : newCategoryTypes) {
                categoryType.setCategory(category);  // Set the parent reference
                category.getCategoryTypes().add(categoryType);  // Add to managed collection
            }
        }

        return categoryRepository.save(category);

    }
}