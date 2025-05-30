package com.ars.ecomm_api.service;

import com.ars.ecomm_api.dto.ProductDto;
import com.ars.ecomm_api.entity.Product;

import java.util.List;

public interface ProductService {
    Product createProduct(ProductDto productDto);
    List<Product> getAllProducts();
}
