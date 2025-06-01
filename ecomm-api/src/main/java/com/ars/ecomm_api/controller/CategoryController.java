package com.ars.ecomm_api.controller;


import com.ars.ecomm_api.dto.CategoryDto;
import com.ars.ecomm_api.entity.Category;
import com.ars.ecomm_api.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(){
        return new ResponseEntity<>(categoryService.getAllCategories(), HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable(value = "id") UUID categoryId) {
        return new ResponseEntity<>(categoryService.getCategory(categoryId), HttpStatus.OK);

    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody CategoryDto categoryDto,
                                                   @PathVariable(value = "id") UUID categoryId){
        return new ResponseEntity<>(categoryService.updateCategory(categoryDto, categoryId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody CategoryDto categoryDto) {
        return new ResponseEntity<>(categoryService.createCategory(categoryDto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable(value = "id") UUID categoryId) {
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
