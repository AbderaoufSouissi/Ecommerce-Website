
import type { LoaderFunctionArgs } from "react-router-dom"
import { store } from "../store/store"
import { setLoading } from "../store/features/common"
import { getProductBySlug } from "../api/fetchProducts"

export const loadProductBySlug = async ({ params }: LoaderFunctionArgs) => {


    console.log('Loader called with params:', params); // Debug log
    try {
        store.dispatch(setLoading(true))
        const product = await getProductBySlug(params?.slug as string);
        store.dispatch(setLoading(false))
        return {product}
    }
    catch (error) {
        console.error(error)
        
    }
    

}