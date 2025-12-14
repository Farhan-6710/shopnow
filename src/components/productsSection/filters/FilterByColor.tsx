import React from "react";
import { CHECKBOX_CLASSES } from "@/src/constants/filters";

interface FilterByColorProps {
  colorOptions: string[];
  selectedColors: string[];
  onToggleColor: (color: string) => void;
}

const FilterByColor: React.FC<FilterByColorProps> = ({
  colorOptions,
  selectedColors,
  onToggleColor,
}) => {
  return (
    <div className="filter-div mb-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Filter by Color
      </h3>
      <div className="flex flex-wrap gap-3">
        {colorOptions.map((color) => (
          <label key={color} className="flex items-center cursor-pointer">
            <div className="flex flex-col justify-center items-center gap-1.5">
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => onToggleColor(color)}
                className={CHECKBOX_CLASSES}
              />
              <span
                className="h-5 w-5 rounded-full border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: color }}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByColor;
