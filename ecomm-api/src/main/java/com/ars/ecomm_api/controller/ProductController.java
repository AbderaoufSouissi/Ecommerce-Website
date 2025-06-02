package com.ars.ecomm_api.controller;



import com.ars.ecomm_api.dto.ProductDto;
import com.ars.ecomm_api.entity.Product;
import com.ars.ecomm_api.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;



    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
       return new ResponseEntity<>(productService.createProduct(productDto), HttpStatus.CREATED);
    }
}
