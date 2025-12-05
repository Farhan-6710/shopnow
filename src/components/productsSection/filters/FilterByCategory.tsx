import React from "react";
import { CHECKBOX_CLASSES } from "@/src/constants/filters";

interface FilterByCategoryProps {
  availableCategories: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onResetFilters: () => void;
}

const FilterByCategory: React.FC<FilterByCategoryProps> = ({
  availableCategories,
  selectedCategories,
  onToggleCategory,
  onResetFilters,
}) => {
  return (
    <div className="filter-div mb-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Filter by Category
      </h3>

      {/* "All" Checkbox */}
      <div className="mb-2">
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedCategories.length === 0}
            onChange={onResetFilters}
            className={CHECKBOX_CLASSES}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">All</span>
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        {availableCategories.map((category) => (
          <label
            key={category}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onToggleCategory(category)}
              className={CHECKBOX_CLASSES}
            />
            <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByCategory;