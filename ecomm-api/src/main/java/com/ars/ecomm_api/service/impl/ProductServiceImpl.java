package com.ars.ecomm_api.service.impl;

import com.ars.ecomm_api.dto.ProductDto;
import com.ars.ecomm_api.entity.*;
import com.ars.ecomm_api.exception.ResourceNotFoundException;
import com.ars.ecomm_api.mapper.ProductMapper;
import com.ars.ecomm_api.repository.ProductRepository;
import com.ars.ecomm_api.repository.CategoryRepository;

import com.ars.ecomm_api.service.CategoryService;
import com.ars.ecomm_api.service.ProductService;
import com.ars.ecomm_api.specification.ProductSpecification;
import lombok.RequiredArgsConstructor;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;

    private final CategoryService categoryService;


    @Override
    public Product createProduct(ProductDto productDto) {
        Product product = productMapper.toProduct(productDto);
        
        Category category = categoryService.getCategory(productDto.getCategoryId());
        if (category == null) {
            throw new ResourceNotFoundException("Category not found with id: " + productDto.getCategoryId());
        }
        product.setCategory(category);

        UUID categoryTypeId = productDto.getCategoryTypeId();
        CategoryType categoryType = category.getCategoryTypes().stream()
                .filter(ct -> ct.getId().equals(categoryTypeId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "CategoryType with id " + categoryTypeId + " not found in category " + category.getName()
                ));
        product.setCategoryType(categoryType);


        if (productDto.getProductResources() != null && !productDto.getProductResources().isEmpty()) {
            List<ProductResource> resources = productDto.getProductResources().stream()
                    .map(resourceDto -> {
                        ProductResource resource = productMapper.toProductResource(resourceDto);
                        resource.setProduct(product); // Set parent relationship
                        return resource;
                    })
                    .collect(Collectors.toList());
            product.setProductResources(resources);
        }


        if (productDto.getProductVariants() != null && !productDto.getProductVariants().isEmpty()) {
            List<ProductVariant> variants = productDto.getProductVariants().stream()
                    .map(variantDto -> {
                        ProductVariant variant = productMapper.toProductVariant(variantDto);
                        variant.setProduct(product); // Set parent relationship
                        return variant;
                    })
                    .collect(Collectors.toList());
            product.setProductVariants(variants);
        }

        return productRepository.save(product);
    }

    @Override
    public List<ProductDto> getAllProducts(UUID categoryId, UUID categoryTypeId) {
        List<Product> products = productRepository.findAll(buildProductSpecification(categoryId, categoryTypeId));
        return productMapper.toProductDtos(products);
    }



    private Specification<Product> buildProductSpecification(UUID categoryId, UUID categoryTypeId) {
        Specification<Product> spec = null;

        if (categoryId != null) {
            spec = ProductSpecification.hasCategoryId(categoryId);
        }

        if (categoryTypeId != null) {
            spec = (spec == null)
                    ? ProductSpecification.hasCategoryTypeId(categoryTypeId)
                    : spec.and(ProductSpecification.hasCategoryTypeId(categoryTypeId));
        }

        return spec;
    }


    @Override
    public Product getProduct(UUID productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + productId));
    }

    @Override
    public void deleteProduct(UUID productId) {
        if (!productRepository.existsById(productId)) {
            throw new RuntimeException("Product not found with id: " + productId);
        }
        productRepository.deleteById(productId);
    }
}