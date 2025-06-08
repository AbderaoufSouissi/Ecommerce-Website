import { createSlice} from "@reduxjs/toolkit"
import type { ProductDTO } from "../../api/types"




interface ProductState {
    products: ProductDTO[] 
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
            
        },
        loadProducts: (state, action) => {
            state.products = action.payload
        
        }
    }
})

export const { addProduct, loadProducts } = productSlice.actions;
export default productSlice.reducer