
import type { LoaderFunctionArgs } from "react-router-dom"
import content from "../data/content.json"

export const loadProductById = ({ params }: LoaderFunctionArgs) => {
    const product = content?.products?.find(product => product?.id === (params?.productId))
    return { product };

}