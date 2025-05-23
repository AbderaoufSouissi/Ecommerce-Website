import { useState } from "react";

interface ColorsFilterProps {
    colors?: string[];
}


const colorSelector = {
    "Black": "#1A1A1A",
    "White": "#F5F5F5",
    "Royal Blue": "#1E3BA3",
    "Navy Blue": "#000040",
    "Grey": "#808080",
    "Forest Green": "#0A3A0A",
    "Khaki": "#A69B4F",
    "Charcoal": "#36454F",
    "Steel Blue": "#4682B4",
    "Slate": "#708090",
    "Burgundy": "#800020",
    "Deep Purple": "#483D8B",
    "Olive": "#556B2F",
    "Taupe": "#8B7D6B",
    "Midnight Blue": "#191970",
    "Pewter": "#96A8A1",
    "Espresso": "#3C2415",
    "Sage": "#9CAF88",
    "Gunmetal": "#2C3539"
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