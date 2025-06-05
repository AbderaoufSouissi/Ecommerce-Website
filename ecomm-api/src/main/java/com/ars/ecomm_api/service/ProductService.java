package com.ars.ecomm_api.service;

import com.ars.ecomm_api.dto.ProductDto;
import com.ars.ecomm_api.entity.Product;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    Product createProduct(ProductDto productDto);
    List<ProductDto> getAllProducts(UUID categoryId, UUID categoryTypeId);

    Product getProduct(UUID ProductId);
    void deleteProduct(UUID ProductId);

}
