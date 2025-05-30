package com.ars.ecomm_api.service.impl;

import com.ars.ecomm_api.dto.ProductDto;
import com.ars.ecomm_api.entity.Product;
import com.ars.ecomm_api.mapper.ProductMapper;
import com.ars.ecomm_api.repository.ProductRepository;
import com.ars.ecomm_api.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;



    @Override
    public Product createProduct(ProductDto productDto) {
        return null;
    }

    @Override
    public List<Product> getAllProducts() {


        return productRepository.findAll();
    }
}
