import { createSlice} from "@reduxjs/toolkit"

// Define the CartItem interface
interface CartItem {
    id: string | number;
    name: string;
    price: number;
    quantity: number;
    // Add other cart item properties as needed
}

interface CartState {
    cart: CartItem[] // Array of CartItem objects, not empty tuple
}

const initialState: CartState = {
    cart: []
}

const cartSlice = createSlice({
    name: "cartState",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
            // No need to return state with Immer
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload)
            // Assign filtered array back to state.cart
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer