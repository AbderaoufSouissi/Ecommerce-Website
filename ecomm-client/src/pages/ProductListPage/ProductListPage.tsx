import { useMemo } from "react"
import FilterIcon from "../../components/common/FilterIcon"
import content from "../../data/content.json"
import Categories from "../../components/Filters/Categories"
import PriceFilter from "../../components/Filters/PriceFilter"
import ColorsFilter from "../../components/Filters/ColorsFilter"
import SizeFilter from "../../components/Filters/SizeFilter"
import ProductCard from "./ProductCard"

type Category = {
  id: number,
  name: string,
  code: string,
  description: string
  path: string
  types: CategorieType[]
  meta_data: MetaData[]
}

export type MetaData = {
  colors: string[],
  sizes: string[]

}

export type CategorieType = {
  type_id: number,
  code: string,
  name: string
}

const categories: Category[] = content?.categories



const ProductListPage = ({ categoryType }: { categoryType: string }) => {
  
  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType)
  }, [categoryType])

  const productListItems = useMemo(() => {
    return content?.products.filter((product) => product?.category_id === categoryContent?.id) 
  },[categoryContent?.id])



  



  return (
    <div>
      <div className="flex">
        <div className="w-[20%] p-[10px] border rounded-lg m-[20px]">
          {/* FILTERS  */}
          <div className="flex justify-between">
            <p className="text-xl text-gray-600">Filter</p>
            <FilterIcon/>
          </div>
          <div>
            <p className="text-[16px] text-black mt-5">Categories</p>
            <Categories types={categoryContent?.types} />
            <hr className="mt-4"/>
          </div>
          <div>
            {/* PRICE */}
            <PriceFilter />
            <hr className="mt-4"/>
            {/* COLORS */}

            <ColorsFilter colors={categoryContent?.meta_data?.[0]?.colors} />
            <hr />
            {/* SIZES */}
            <SizeFilter sizes={categoryContent?.meta_data?.[0]?.sizes} hideTitle={false}/>
          </div>
        </div>
        <div className="p-[15px]">
          {/* PRODUCTS */}
           <p className="text-black text-lg">{categoryContent?.description}</p>
          <div className="pt-4 grid grid-cols-1  lg:grid-cols-4 md:grid-cols-2 gap-8 px-2">
            {productListItems?.map((item, id) => <ProductCard key={id}  {...item} />)}
          </div>
         
          
        </div>
      </div>
    </div>
  )
}

export default ProductListPage