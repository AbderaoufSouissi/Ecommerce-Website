package com.ars.ecomm_api.controller;



import com.ars.ecomm_api.dto.ProductDto;
import com.ars.ecomm_api.entity.Product;
import com.ars.ecomm_api.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;



    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts(
            @RequestParam(required = false) UUID categoryId,
            @RequestParam(required = false) UUID categoryTypeId,
            @RequestParam(required = false) String slug) {

        if (StringUtils.isNotBlank(slug)) {
            ProductDto productDto = productService.getProductBySlug(slug);
            if (productDto != null) {
                return new ResponseEntity<>(List.of(productDto), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

        List<ProductDto> productDtoList = productService.getAllProducts(categoryId, categoryTypeId);
        return new ResponseEntity<>(productDtoList, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable UUID id) {
        return new ResponseEntity<>(productService.getProductById(id),HttpStatus.FOUND);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductDto productDto) {
       return new ResponseEntity<>(productService.createProduct(productDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable(value = "id") UUID productId ,@RequestBody ProductDto productDto){
            Product product = productService.updateProduct(productId,productDto);
            return new ResponseEntity<>(product, HttpStatus.OK);
    }
}
