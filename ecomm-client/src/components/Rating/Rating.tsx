import { useMemo } from "react";
import StarIcon from "../common/StarIcon";
import EmptyStarIcon from "../common/EmptyStarIcon";

const Rating = ({ rating }: { rating: number }) => {
  const ratingNumber = useMemo(() => {
    return Array(Math.floor(Number(rating))).fill(null); // or fill(0), or fill('')
  }, [rating]);

  return (
    <div className="flex items-center">
      {ratingNumber?.map((_, index) => (
        <StarIcon key={index} />
      ))}
      {new Array(5 - ratingNumber?.length)
        .fill(null)
        .map((_, index) => (
          <EmptyStarIcon key={"empty-" + index} />
        ))}

      <p className="text-[20px] text-gray-700 px-2 hover:text-gray-900">{rating}</p>
    </div>
  );
};

export default Rating;
