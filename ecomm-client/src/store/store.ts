import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product";
import cartReducer from "./features/cart";
import commonReducer from "./features/common";
import categoryReducer from "./features/category";

export const store = configureStore({
  reducer: {
    productState: productReducer,
    cartState: cartReducer,
    categoryState: categoryReducer,
    commonState: commonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
