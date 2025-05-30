package com.ars.ecomm_api.mapper;

import com.ars.ecomm_api.dto.ProductDto;
import com.ars.ecomm_api.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductMapper INSTANCE = Mappers.getMapper( ProductMapper.class );


    ProductDto toProductDto(Product product);
    Product toProduct(ProductDto productDto);
    List<ProductDto> toProductDtos(List<Product> products);
    List<Product> toProducts(List<ProductDto> productDtos);
}
