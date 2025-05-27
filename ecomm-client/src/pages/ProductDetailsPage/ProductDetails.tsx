import { useEffect, useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Breadcrumb, { type BreadcrumbLink } from "../../components/Breadcrumb/Breadcrumb";
import content from "../../data/content.json"
import Rating from "../../components/Rating/Rating";
import SizeFilter from "../../components/Filters/SizeFilter";
import ProductColors from "./ProductColors";
import CartIcon from "../../components/common/CartIcon";
import SectionHeading from "../../components/Sections/SectionsHeading/SectionHeading";
import ProductCard from "../ProductListPage/ProductCard";


interface Product {
  id: number;
  title: string;
  description: string;
  category_id: number;
  type_id: number;
  brand: string;
  price: number;
  size: string[];
  color: string[];
  discount: number;
  thumbnail: string;
  images: string[];
  rating: number;
}




const categories = content?.categories;

const ProductDetails = () => {

  const { product } = useLoaderData() as { product: Product };
  const [image, setImage] = useState<string>(product?.thumbnail)
  const [breadCrumbLinks, setBreadCrumbLinks] = useState<BreadcrumbLink[]>([{ title: 'Shop', path: '/' }]);

  const similarProducts = useMemo(() => {
    return content?.products?.filter(
      (productItem) => productItem?.id != product?.id
        && productItem?.type_id == product?.type_id
        && productItem?.category_id == product?.category_id)
  },[product])

  const productCategory = useMemo(() => {
    return categories?.find((category) => category.id === product?.category_id);
  }, [product])

  useEffect(() => {
    setImage(product?.images[0])

    const arrayLinks: BreadcrumbLink[] = [];

    if (productCategory?.name && productCategory?.path) {
      arrayLinks.push({
        title: productCategory.name,
        path: productCategory.path
      });
    }
    const productType = productCategory?.types?.find((item) => item?.type_id === product?.type_id);
    if (productType?.name) {
      arrayLinks.push({
        title: productType.name,
        path: productType.name
      });
    }
    setBreadCrumbLinks([breadCrumbLinks[0], ...arrayLinks]);
  }, [productCategory, product]);
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
                product?.images?.map((image, index) => <button key={index} onClick={() => setImage(image)} className="rounded-lg w-fit p-2">
                  <img src={image} className="h-[80px] w-[60px] rounded bg-cover bg-center hover:scale-105 " alt={"sample-" + index} />
                </button>)
              }
            </div>

          </div>
          <div className="w-full md:w-[80%] flex justify-center md:pt-0 pt-14">
            <img src={image} alt={product?.title} className="h-full w-full max-h-[600px] border-none rounded-lg cursor-pointer object-cover" />
          </div>

        </div>
      </div>
      <div className='w-[60%] px-10'>
        <Breadcrumb links={breadCrumbLinks} />
        {/* Product Description */}
        <p className="text-3xl pt-2">{product?.title}</p>
        <Rating rating={product?.rating} />
        {/* PRICE TAG */}
        <p className="text-xl font-bold py-2">{product?.price} TND</p>
        <div className='flex flex-col'>
          <div className='flex gap-2'>
            <p className='text-sm bold'>Select Size</p>
            <Link to={"https://en.wikipedia.org/wiki/Clothing_sizes"} className='text-sm text-gray-500'>{'Size Guide ->'}</Link>
          </div>
        </div>
        <div className="mt-2"><SizeFilter sizes={product?.size} hideTitle={true} /></div>
        <div>
          <p className="text-lg font-bold" >Available Colors</p>
          <ProductColors colors={product?.color}/>
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

      </div></> }
      
    </>


  )
}

export default ProductDetails;    