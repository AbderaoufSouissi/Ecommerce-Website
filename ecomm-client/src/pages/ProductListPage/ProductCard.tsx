import { useState } from "react";
import FavoriteIcon from "../../components/common/FavoriteIcon";
import { Link } from "react-router-dom";
import type { ProductDTO } from "../../api/types";



const ProductCard = ({
  id,
  name,
  description,
  price,
  brand,
  thumbnail,
  slug,
}: ProductDTO) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex flex-col pt-2 max-w-70 relative">
      <Link to={`/product/${slug}`}>
        <img
          src={thumbnail}
          className={
            "h-[400px] bg-cover block bg-center rounded hover:scale-101 cursor-pointer object-cover transition duration-200 ease-in-out w-full"
          }
          alt={name}
        />
      </Link>
      <button className="absolute top-0 right-0 pt-4 pr-4 cursor-pointer">
        <FavoriteIcon
          filled={liked}
          onClick={() => setLiked(!liked)}
          size={28}
        />
      </button>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-xl font-bold p-1">{name}</p>
          {description && (
            <p className="text-sm italic px-1 text-gray-900">{brand}</p>
          )}
        </div>
        <div>
          <p>{price} TND</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
