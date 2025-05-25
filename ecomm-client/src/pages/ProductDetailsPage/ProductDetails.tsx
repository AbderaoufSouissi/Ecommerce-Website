import { useEffect, useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Breadcrumb, { type BreadcrumbLink } from "../../components/Breadcrumb/Breadcrumb";
import content from "../../data/content.json"


interface Product{
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
   const [breadCrumbLinks, setBreadCrumbLinks] = useState<BreadcrumbLink[]>([ { title: 'Shop', path: '/' }]);

  const productCategory = useMemo(() => {
    return categories?.find((category) => category.id === product?.category_id);
  },[product])

  useEffect(() => {
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
    <div className='flex flex-col md:flex-row p-10'>
      <div className='w-[100%] 1g:w-[50%] md:w-[40%]'>
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
              <img src={image} alt={product?.title} className="h-full w-full max-h-[600px] border-none rounded-lg cursor-pointer object-cover"/>
          </div>

        </div>
      </div>
      <div className='w-[60%] px-10'>
        <Breadcrumb links={breadCrumbLinks}/>
        {/* Product Description */}
        <p className="text-3xl pt-2">{product?.title }</p>
      </div>
    </div>
  )
}

export default ProductDetails;    