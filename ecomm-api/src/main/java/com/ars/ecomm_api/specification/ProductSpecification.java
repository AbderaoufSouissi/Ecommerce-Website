package com.ars.ecomm_api.specification;

import com.ars.ecomm_api.entity.Product;
import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class ProductSpecification {
    public static Specification<Product> hasCategoryId(UUID categoryId) {
        return categoryId == null ? null : ((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("category").get("id"), categoryId));
    }

    public static Specification<Product> hasCategoryTypeId(UUID categoryTypeId) {
        return categoryTypeId == null ? null : ((root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("categoryType").get("id"), categoryTypeId));
    }
}
