import axios from "axios";
import { API_BASE_URL, API_URLS } from "./constant";
import type { CategoryDTO } from "./types";

export const fetchCategories = async () => {
  const url = new URL(API_BASE_URL + API_URLS.GET_CATEGORIES);

  try {
    const response = await axios.get<CategoryDTO[]>(url.toString());
    return response.data;
  }
  catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};