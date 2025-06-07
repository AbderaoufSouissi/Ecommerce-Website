// DTO for Category API Response


export interface CategoryTypeDTO {
  name: string;
  code: string;
  description: string;
}

// DTO for Category
export interface CategoryDTO {
  id?: string
  name: string;
  code: string;
  description: string;
  categoryTypes: CategoryTypeDTO[];
}





// DTOs for Product API Response
export interface ProductVariantDTO {
  id: string;
  color: string;
  size: string;
  stockQuantity: number;
}

export interface ProductResourceDTO {
  id: string;
  name: string;
  url: string;
  primary: boolean;
  type: "image"
}

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: number;
  brand: string;
  rating: number;
  newArrival: boolean;
  categoryId: string;
  thumbnail: string;
  categoryName: string;
  categoryTypeId: string;
  categoryTypeName: string;
  productVariants: ProductVariantDTO[];
  productResources: ProductResourceDTO[];
}