import { useEffect, useMemo, useState } from "react"
import FilterIcon from "../../components/common/FilterIcon"
import content from "../../data/content.json"
import Categories from "../../components/Filters/Categories"
import PriceFilter from "../../components/Filters/PriceFilter"
import ColorsFilter from "../../components/Filters/ColorsFilter"
import SizeFilter from "../../components/Filters/SizeFilter"
import ProductCard from "./ProductCard"
import { fetchProducts } from "../../api/fetchProducts"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../store/features/common"
import type { CategoryDTO, ProductDTO } from "../../api/types"
import type { RootState } from "../../store/store"

type Category = {
  id: string,
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
  type_id: string,
  code: string,
  name: string
}

const categories: Category[] = content?.categories



const ProductListPage = ({ categoryType }: { categoryType: string }) => {

  const categoryData: CategoryDTO[] = useSelector((state: RootState) => state?.categoryState?.categories)
  const dispatch = useDispatch()
  const [products,setProducts] = useState<ProductDTO[]>([])
  
  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType)
  }, [categoryType])

  // const productListItems = useMemo(() => {
  //   return content?.products.filter((product) => product?.category_id === categoryContent?.id) 
  // }, [categoryContent])

  const category = useMemo(() => {
  if (!categoryData || !categoryType) return undefined;
  return categoryData.find(
    c => c.code.toLowerCase() === categoryType.toLowerCase()
  );
}, [categoryData, categoryType]);



  useEffect(() => {
     if (!category || !category.id) return; // guard clause
    
    dispatch(setLoading(true));
    console.log("Fetching with categoryId:", category?.id)
    if (!category?.id) return;
    fetchProducts(category?.id)
      .then((res) => {
        console.log(res)
        setProducts(res);
      })
      .catch((err) => {console.error(err)})
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [category?.id, dispatch]);




  



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
           <p className="text-black text-lg ">{category?.description}</p>
          <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 px-2">
            {products?.map((item, index) => <ProductCard key={item?.id + "_" + index} {...item} />)}
          </div>
         
          
        </div>
      </div>
    </div>
  )
}

export default ProductListPage

