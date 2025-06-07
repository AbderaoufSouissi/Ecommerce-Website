import axios from "axios";
import { API_BASE_URL, API_URLS } from "./constant";
import type { ProductDTO } from "./types";

export const fetchProducts = async (categoryId?: string, categoryTypeId?: string) => {
  if (!categoryId) {
    return [];
  }

  const url = new URL(API_BASE_URL + API_URLS.GET_PRODUCTS);
  url.searchParams.append("categoryId", categoryId);
  if (categoryTypeId) {
    url.searchParams.append("categoryTypeId", categoryTypeId);
  }
  try {
    const response = await axios.get<ProductDTO[]>(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []
  }
};
