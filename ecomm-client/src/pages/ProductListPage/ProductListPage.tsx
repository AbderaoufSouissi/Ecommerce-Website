import { useMemo } from "react"
import FilterIcon from "../../components/common/FilterIcon"
import content from "../../data/content.json"
import Categories from "../../components/Filters/Categories"
import PriceFilter from "../../components/Filters/PriceFilter"
import ColorsFilter from "../../components/Filters/ColorsFilter"

type Category = {
  id: number,
  name: string,
  code: string,
  description:string
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
  type: string
}

const categories: Category[] = content?.categories

const ProductListPage = ({ categoryType }: { categoryType: string }) => {
  
  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType)
  }, [categoryType])
  



  return (
    <div>
      <div className="flex">
        <div className="w-[20%] p-[10px] border rounded-lg m-[20px]">
          {/* FILTERS  */}
          <div className="flex justify-between">
            <p className="text-[16px] text-gray-600">Filter</p>
            <FilterIcon/>
          </div>
          <div>
            <p className="text-[16px] text-black mt-5">Categories</p>
            <Categories types={categoryContent?.types} />
            <hr />
          </div>
          <div>
            {/* PRICE */}
            <PriceFilter />
            <hr className="mt-4"/>
            {/* COLORS */}

            <ColorsFilter colors={categoryContent?.meta_data?.[0]?.colors} />
          </div>
        </div>
        <div className="p-[15px]">
          {/* PRODUCTS */}
          <p className="text-black text-lg">{categoryContent?.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductListPage