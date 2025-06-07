import { createSlice } from "@reduxjs/toolkit"

interface CommonState{
    loading: boolean
}



export const initialState: CommonState  = {
    loading: false
}

export const commonSlice = createSlice({
    name: "commonState",
    initialState: initialState,
    reducers: {
        setLoading: (state, action) => {
            return {
                ...state,
                loading: action?.payload
            }
        }
    }
})


export const { setLoading } = commonSlice?.actions

export default commonSlice?.reducer