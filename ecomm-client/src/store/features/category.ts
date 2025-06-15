import { createSlice } from "@reduxjs/toolkit"
import type { CategoryDTO } from "../../api/types"

interface CategoryState{
    categories: CategoryDTO[]
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