import { useMemo } from "react"
import FilterIcon from "../../components/common/FilterIcon"
import content from "../../data/content.json"

type Category = {
  id: number,
  name: string,
  code: string,
  description:string
  types: CategorieType[]
}

type CategorieType = {
  id: number,
  name: string,
  description: string
}

const categories: Category[] = content?.categories

const ProductListPage = ({ categoryType }: { categoryType: string }) => {
  
  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType)
  },[categoryType])


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