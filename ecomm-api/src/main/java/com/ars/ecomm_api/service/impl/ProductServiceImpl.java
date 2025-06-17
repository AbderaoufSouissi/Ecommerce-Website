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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    @Override
    public ProductDto getProductBySlug(String slug) {
        return Optional.ofNullable(productRepository.findBySlug(slug))
                .map(productMapper::toProductDto)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with slug: " + slug)
        );
    }

    @Override
    public ProductDto getProductById(UUID id) {
        return productRepository.findById(id)
                .map(productMapper::toProductDto)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Override
    public Product updateProduct(UUID productId, ProductDto productDto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setBrand(productDto.getBrand());
        product.setNewArrival(productDto.getNewArrival());
        product.setRating(productDto.getRating());
        product.setSlug(productDto.getSlug());


        Category productCategory = categoryRepository.getCategoryById(productDto.getCategoryId());
        if (productCategory == null) {
            throw new ResourceNotFoundException("Category not found with id: " + productDto.getCategoryId());
        }
        product.setCategory(productCategory);


        CategoryType productCategoryType = productCategory.getCategoryTypes().stream()
                .filter(categoryType -> categoryType.getId().equals(productDto.getCategoryTypeId()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "CategoryType not found with id: " + productDto.getCategoryTypeId()));
        product.setCategoryType(productCategoryType);


        product.getProductResources().clear();
        if (productDto.getProductResources() != null && !productDto.getProductResources().isEmpty()) {
            List<ProductResource> newProductResources = productMapper.toProductResources(productDto.getProductResources());
            for (ProductResource resource : newProductResources) {
                resource.setProduct(product); // Set parent
                product.getProductResources().add(resource);
            }
        }


        product.getProductVariants().clear();
        if (productDto.getProductVariants() != null && !productDto.getProductVariants().isEmpty()) {
            List<ProductVariant> newProductVariants = productMapper.toProductVariants(productDto.getProductVariants());
            for (ProductVariant variant : newProductVariants) {
                variant.setProduct(product); // Set parent
                product.getProductVariants().add(variant);
            }
        }


        return productRepository.save(product);
    }

    @Override
    public Product fetchProductById(UUID id) {
        return productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
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


}