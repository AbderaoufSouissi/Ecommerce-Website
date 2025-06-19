import { useCallback, useEffect, useState } from "react";

interface SizeFilterProps {
  sizes?: string[];
  hideTitle: boolean;
  multi: boolean;
  onChange: (appliedSizes: string[]) => void;
}

const SizeFilter = ({ sizes, hideTitle, multi = true, onChange }: SizeFilterProps) => {
  const [appliedSize, setAppliedSize] = useState<string[]>([]);

  const handleOnClick = useCallback(
    (size: string) => {
      let updated: string[];

      if (appliedSize.includes(size)) {
        updated = appliedSize.filter((s) => s !== size);
      } else {
        updated = multi ? [...appliedSize, size] : [size];
      }

      setAppliedSize(updated);
    },
    [appliedSize, multi]
  );

  useEffect(() => {
    onChange(appliedSize);
  }, [appliedSize, onChange]);

  return (
    <div className="flex flex-col mb-6">
      {!hideTitle && <p className="text-lg font-semibold text-gray-800 mb-4">Available Sizes</p>}

      <div className="flex flex-wrap gap-3">
        {sizes?.map((size) => {
          const isSelected = appliedSize.includes(size);
          return (
            <button
              key={size}
              type="button"
              onClick={() => handleOnClick(size)}
              className={`px-4 py-2 rounded-xl border transition-all duration-200 text-sm font-medium
                ${
                  isSelected
                    ? "bg-purple-900 text-white shadow-md"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }
              `}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeFilter;
