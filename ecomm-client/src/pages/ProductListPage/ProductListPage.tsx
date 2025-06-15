import { useEffect, useMemo, useState } from "react"
import FilterIcon from "../../components/common/FilterIcon"
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
import _ from "lodash"



const ProductListPage = ({ categoryType }: { categoryType: string }) => {

  const categoryData: CategoryDTO[] = useSelector((state: RootState) => state?.categoryState?.categories)
  const dispatch = useDispatch()
  const [products,setProducts] = useState<ProductDTO[]>([])
  
  const categoryContent = useMemo(() => {
  return categoryData?.find((category) => category.code.toLowerCase() === categoryType.toLowerCase());
}, [categoryType, categoryData]);



  
  

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

 
const availableColors = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    return _.uniq(
      products.flatMap(product => 
        product.productVariants.map(variant => variant.color)
      )
    );
  }, [products]);

const availableSizes = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    return _.uniq(
      products.flatMap(product => 
        product.productVariants.map(variant => variant.size)
      )
    );
  }, [products]);


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
            <Categories types={categoryContent?.categoryTypes} />
            <hr className="mt-4"/>
          </div>
          <div>
            {/* PRICE */}
            <PriceFilter />
            <hr className="mt-4"/>
            {/* COLORS */}

            <ColorsFilter colors={availableColors} />
            <hr />
            {/* SIZES */}
            <SizeFilter sizes={availableSizes} multi={false} hideTitle={false}/>
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

