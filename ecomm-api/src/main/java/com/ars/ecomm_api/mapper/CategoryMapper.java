package com.ars.ecomm_api.mapper;

import com.ars.ecomm_api.dto.CategoryDto;
import com.ars.ecomm_api.entity.Category;
import com.ars.ecomm_api.entity.CategoryType;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;


import java.util.List;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    Category toCategory(CategoryDto categoryDto);
    CategoryDto toCategoryDto(Category category);
    List<Category> toCategories(List<CategoryDto> categoryDtos);
    List<CategoryDto> toCategoryDtos(List<Category> categories);


    @AfterMapping
    default void establishRelationships(@MappingTarget Category category) {
        if (category.getCategoryTypes() != null) {
            for (CategoryType categoryType : category.getCategoryTypes()) {
                categoryType.setCategory(category);
            }
        }
    }

}
