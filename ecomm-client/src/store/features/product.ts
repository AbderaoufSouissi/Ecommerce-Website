import { createSlice} from "@reduxjs/toolkit"

// Define the Product interface
interface Product {
    id: string | number;
    name: string;
    price: number;
    // Add other product properties as needed
}

interface ProductState {
    products: Product[] // Array of Product objects, not empty tuple
}

const initialState: ProductState = {
    products: []
}

const productSlice = createSlice({
    name: "productState",
    initialState: initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
            // No need to return state with Immer
        },
        loadProducts: (state, action) => {
            state.products = action.payload
            // Simpler assignment with Immer
        }
    }
})

export const { addProduct, loadProducts } = productSlice.actions;
export default productSlice.reducer