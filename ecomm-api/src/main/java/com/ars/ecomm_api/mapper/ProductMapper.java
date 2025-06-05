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
import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "categoryType.id", target = "categoryTypeId")
    @Mapping(source = "categoryType.name", target = "categoryTypeName")
    @Mapping(target = "thumbnail", expression = "java(getPrimaryResourceUrl(product.getProductResources()))")
    ProductDto toProductDto(Product product);

    // Add this method for mapping List<Product> to List<ProductDto>
    List<ProductDto> toProductDtos(List<Product> products);

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

    default String getPrimaryResourceUrl(List<ProductResource> productResources) {
        if (productResources == null || productResources.isEmpty()) {
            return null;
        }

        return productResources.stream()
                .filter(resource -> resource.getPrimary() != null && resource.getPrimary())
                .findFirst()
                .map(ProductResource::getUrl)
                .orElse(null);
    }
}