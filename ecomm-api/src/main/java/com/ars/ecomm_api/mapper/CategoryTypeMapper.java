package com.ars.ecomm_api.mapper;

import com.ars.ecomm_api.dto.CategoryTypeDto;
import com.ars.ecomm_api.entity.CategoryType;
import org.mapstruct.*;


import java.util.List;


@Mapper(componentModel = "spring")
public interface CategoryTypeMapper {


    CategoryTypeDto toCategoryTypeDto(CategoryType categoryType);

    CategoryType toCategoryType(CategoryTypeDto dto);

    List<CategoryTypeDto>   toCategoryTypeDtos(List<CategoryType> categoryTypes);

    List<CategoryType> toCategoryTypes(List<CategoryTypeDto> dtos);


}
