export const API_URLS = {
    GET_PRODUCTS: "/api/products",
    GET_PRODUCT: (id: string) => `/api/products/${id}`,
    GET_CATEGORIES: "/api/categories",
    GET_CATEGORY: (id: string) => `/api/categories/${id}`
};


export const API_BASE_URL : string = import.meta.env.VITE_API_BASE_URL
