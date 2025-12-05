import React from "react";
import { PRICE_RANGE_OPTIONS, CHECKBOX_CLASSES } from "@/src/constants/filters";

interface FilterByPriceRangeProps {
  selectedPriceRanges: string[];
  onTogglePriceRange: (range: string) => void;
}

const FilterByPriceRange: React.FC<FilterByPriceRangeProps> = ({
  selectedPriceRanges,
  onTogglePriceRange,
}) => {
  return (
    <div className="filter-div mb-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Filter by Price Range
      </h3>
      <div className="space-y-2">
        {PRICE_RANGE_OPTIONS.map((range) => (
          <label
            key={range}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedPriceRanges.includes(range)}
              onChange={() => onTogglePriceRange(range)}
              className={CHECKBOX_CLASSES}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
              {range}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByPriceRange;
