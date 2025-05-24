import { useState } from "react";

interface ColorsFilterProps {
    colors?: string[];
}


const colorSelector = {
  "Grey": "#999999",
  "Black": "#000000",
  "Beige": "#FAF9E3",
  "White": "#FFFFFF",
  "Blue": "#0000FF",
  "Brown": "#993333",
  "Green": "#008000",
  "Navy": "#000080"
};


const ColorsFilter = ({ colors }: ColorsFilterProps) => {

    const [appliedColors, setAppliedColors] = useState<string[]>([]);

    const handleOnClick = (color: string) => {
        if (appliedColors.includes(color)) {
            setAppliedColors(appliedColors.filter(c => c !== color));
        } else {
            setAppliedColors([...appliedColors, color]);
        }
    };






    return (
        <div className="flex flex-col mb-4">
            <p className="text-[16px] text-black mt-5 mb-5">Colors</p>
            <div className="flex flex-wrap gap-3">
                {colors?.map((color) => (
                    <div
                        key={color}
                        title={color}
                        className={`w-8 h-8 rounded-lg shadow-sm hover:scale-105 transition-transform duration-150 cursor-pointer ${appliedColors.includes(color)
                                ? "border border-black ring-2 ring-purple-900 ring-offset-1" // Fixed purple ring
                                : "border-0"
                            }`}
                        style={{
                            backgroundColor:
                                colorSelector[color as keyof typeof colorSelector],
                        }}
                        onClick={() => handleOnClick(color)}
                    ></div>
                ))}
            </div>
        </div>
    );
}

export default ColorsFilter