package com.ars.ecomm_api.mapper;

import com.ars.ecomm_api.dto.ProductDto;
import com.ars.ecomm_api.entity.Product;
import com.ars.ecomm_api.entity.ProductResource;
import com.ars.ecomm_api.entity.ProductVariant;
import com.ars.ecomm_api.dto.ProductResourceDto;
import com.ars.ecomm_api.dto.ProductVariantDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;


@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "categoryType.id", target = "categoryTypeId")
    @Mapping(source = "categoryType.name", target = "categoryTypeName")
    ProductDto toProductDto(Product product);

    @Mapping(target = "category", ignore = true)
    @Mapping(target = "categoryType", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Product toProduct(ProductDto productDto);


    @Mapping(target = "product", ignore = true)
    @Mapping(target = "id", ignore = true)
    ProductResource toProductResource(ProductResourceDto productResourceDto);

    @Mapping(target = "product", ignore = true)
    @Mapping(target = "id", ignore = true)
    ProductVariant toProductVariant(ProductVariantDto productVariantDto);


    @AfterMapping
    default void setParentChildRelationships(@MappingTarget Product product) {
        if (product.getProductResources() != null) {
            product.getProductResources().forEach(resource -> resource.setProduct(product));
        }
        if (product.getProductVariants() != null) {
            product.getProductVariants().forEach(variant -> variant.setProduct(product));
        }
    }
}