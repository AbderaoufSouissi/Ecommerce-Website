import { createSlice } from "@reduxjs/toolkit"

interface CategoryState{
    categories: []
}


export const initialState: CategoryState = {
    categories: []
}


export const categorySlice = createSlice({
    name: "categoryState",
    initialState: initialState,
    reducers: {
        loadCategories: (state, action) => {
            return {
                ...state,
                categories: action?.payload
            }
        }
    }
})



export const { loadCategories } = categorySlice?.actions

export default categorySlice?.reducer