import { createBrowserRouter } from "react-router";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ShopAppWrapper from "./pages/ShopAppWrapper";
import App from "./App";
import { createElement } from "react";
import ProductDetails from "./pages/ProductDetailsPage/ProductDetails";
import { loadProductBySlug } from "./routes/products";

export const router = createBrowserRouter([
    {
        path: "/",
        element: createElement(ShopAppWrapper),
        children: [
            {
                path: "/",
                element: createElement(App)
            },
            {
                path: "/women",
                element: createElement(ProductListPage, {categoryType: "WOMEN"})
            },
            {
                path: "/men",
                element: createElement(ProductListPage, {categoryType: "MEN"})
            },
            {
                path: "/product/:slug",
                loader: loadProductBySlug,
                element: createElement(ProductDetails)
            }
        ]
    },
]);