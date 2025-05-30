package com.ars.ecomm_api.mapper;

import com.ars.ecomm_api.dto.CategoryTypeDto;
import com.ars.ecomm_api.entity.Category;
import com.ars.ecomm_api.entity.CategoryType;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.UUID;

@Mapper(componentModel = "spring")
public interface CategoryTypeMapper {
    CategoryTypeMapper INSTANCE = Mappers.getMapper( CategoryTypeMapper.class );

    CategoryTypeDto toCategoryTypeDto(CategoryType categoryType);

    CategoryType toCategoryType(CategoryTypeDto dto);

    List<CategoryTypeDto> toCategoryTypeDtos(List<CategoryType> categoryTypes);

    List<CategoryType> toCategoryTypes(List<CategoryTypeDto> dtos);


}
