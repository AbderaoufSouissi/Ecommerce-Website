import { colorSelector } from "../../components/Filters/ColorsFilter";

const ProductColors = ({ colors }: { colors: Array<string> }) => {
  return (
    <div className="flex pt-2">
      {colors?.map((color, index) => (
        <div
          key={index}
          className="rounded-[50%] w-5 h-5 mx-2"
          style={{ background: colorSelector[color] || "#ccc" }}

        ></div>
      ))}
    </div>
  );
};

export default ProductColors;
