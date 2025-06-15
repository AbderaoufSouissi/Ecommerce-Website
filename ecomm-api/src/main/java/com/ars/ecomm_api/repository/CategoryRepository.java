package com.ars.ecomm_api.repository;

import com.ars.ecomm_api.entity.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    boolean existsByCode(@NotBlank(message = "Category code is required") @Size(min = 2, max = 20, message = "Category code must be between 2 and 20 characters") String code);

    Category getCategoryById(@NotNull(message = "Category ID is required") UUID categoryId);
}
