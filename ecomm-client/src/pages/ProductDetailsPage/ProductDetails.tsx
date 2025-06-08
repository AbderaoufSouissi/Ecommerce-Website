import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Breadcrumb, { type BreadcrumbLink } from "../../components/Breadcrumb/Breadcrumb";
import Rating from "../../components/Rating/Rating";
import SizeFilter from "../../components/Filters/SizeFilter";
import ProductColors from "./ProductColors";
import CartIcon from "../../components/common/CartIcon";
import SectionHeading from "../../components/Sections/SectionsHeading/SectionHeading";
import ProductCard from "../ProductListPage/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { CategoryDTO, ProductDTO } from "../../api/types";
import _ from 'lodash'
import { fetchProducts } from "../../api/fetchProducts";








const ProductDetails = () => {

  const { product } = useLoaderData() as { product: ProductDTO };
  const [image, setImage] = useState<string>(product?.thumbnail)
  const dispatch = useDispatch()
  const [breadCrumbLinks, setBreadCrumbLinks] = useState<BreadcrumbLink[]>([{ title: 'Shop', path: '/' }]);
  const cartItems = useSelector((state: RootState) => state.cartState?.cart)

  const[similarProducts,setSimilarProducts] = useState<ProductDTO[]>([])

  const categories : CategoryDTO[] = useSelector((state:RootState)=> state?.categoryState?.categories)

  const productCategory: CategoryDTO = useMemo(() => {
  return categories?.find((category) => category?.id === product?.categoryId) || {} as CategoryDTO;
  }, [product, categories])
  



  useEffect(() => { 
  fetchProducts(product?.categoryId, product?.categoryTypeId)
    .then(res => setSimilarProducts(res.filter(item => item?.id !== product?.id)))
    .catch(err => {
      console.error("Failed to fetch similar products:", err);
    });
}, []);


  useEffect(() => {
    console.log(product);
    setImage(product?.thumbnail)

    const arrayLinks: BreadcrumbLink[] = [];

    if (productCategory?.name) {
      arrayLinks.push({
        title: productCategory.name,
        path: productCategory.name
      });
    }
    const productType = productCategory?.categoryTypes?.find((item) => item?.id === product?.categoryTypeId)
    if (productType) {
      arrayLinks?.push({
        title: productType?.name,
        path: productType?.name
      });
      
    }
   
    setBreadCrumbLinks([breadCrumbLinks[0], ...arrayLinks]);
  }, [productCategory, product]);

  const addItemToCart = useCallback(() => { }, [])
  
const colors = useMemo (()=>{ 
  const colorSet = _.uniq(_.map(product?.productVariants, 'color')); 
  return colorSet 
  },[product]); 


  const sizes = useMemo(() => { 
  const sizeSet = _.uniq(_.map(product?.productVariants, 'size')); 
  return sizeSet 
  },[product]); 

  




  return (
    <>
    <div className='flex flex-col md:flex-row p-10'>
      <div className='w-[100%] lg:w-[50%] md:w-[40%]'>
        {/* Image */}
        <div className="flex flex-col md:flex-row">
          <div className="w-[100%] md:w-[30%] justify-center h-[40px] md:h-[420px]">
            {/* STACK IMAGES */}
            <div className="flex flex-row md:flex-col justify-center h-full">
              {
                product?.productResources?.map((item, index) => <button key={index} onClick={() => setImage(item?.url)} className="rounded-lg w-fit p-2">
                  <img src={item?.url} className="h-[80px] w-[60px] rounded bg-cover bg-center hover:scale-105 " alt={"sample-" + index} />
                </button>)
              }
            </div>

          </div>
          <div className="w-full md:w-[80%] flex justify-center md:pt-0 pt-14">
            <img src={image} alt={product?.name} className="h-full w-full max-h-[600px] border-none rounded-lg cursor-pointer object-cover" />
          </div>

        </div>
      </div>
      <div className='w-[60%] px-10'>
        <Breadcrumb links={breadCrumbLinks} />
        {/* Product Description */}
        <p className="text-3xl pt-2">{product?.name}</p>
        <Rating rating={product?.rating} />
        {/* PRICE TAG */}
        <p className="text-xl font-bold py-2">{product?.price} TND</p>
        <div className='flex flex-col'>
          <div className='flex gap-2'>
            <p className='text-sm bold'>Select Size</p>
            <Link to={"https://en.wikipedia.org/wiki/Clothing_sizes"} className='text-sm text-gray-500'>{'Size Guide ->'}</Link>
          </div>
        </div>
        <div className="mt-2"><SizeFilter sizes={sizes} hideTitle={true} multi={false} /></div>
        <div>
          <p className="text-lg font-bold" >Available Colors</p>
          <ProductColors colors={colors}/>
        </div>
        <div className='flex pt-4'>
        <button className="group bg-black hover:bg-gray-300 rounded-lg px-4 py-2 transition-colors duration-200">
            <div className="flex items-center text-white group-hover:text-black transition-colors">
              <CartIcon />
              <span>Add to cart</span>
            </div>
          </button>
        </div>
        {/* Product Description */}
      
      </div>
      
      </div>
      {/* Product Description */}
      <SectionHeading title="Product Description" />
      <div className="md:w-[50%] w-full">

        <p className="px-10 text-xl">{product?.description}</p>
      </div>
      {similarProducts.length > 0 && <><SectionHeading title="Similar Products" />
      <div>

        
        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 px-4 sm:px-10 lg:px-10">
          {similarProducts?.map((item, id) => (
            <ProductCard key={id} {...item} />
          ))}
        </div>

        </div></>}
      
    </>


  )
}

export default ProductDetails;    