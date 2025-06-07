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
    return response?.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return []
  }
};


export const getProductBySlug = async (slug: string) => {
  const url = new URL(API_BASE_URL + API_URLS.GET_PRODUCTS)
  if (slug) {
    url.searchParams.append("slug",slug)
  }

 console.log('Requesting URL:', url.toString()); // See the full URL
  console.log('Looking for slug:', slug); // See what slug we're searching for

  try {
    const response = await axios.get<ProductDTO[]>(url.toString())
    const product = response?.data?.[0]
    if (!product) {
      throw new Error(`Product with slug "${slug}" not found`)
    }
    return product
    
  } catch (error) {
    console.error("Error fetching product :", error);
    
  }
  
}