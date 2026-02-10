import React from "react";
import { CHECKBOX_CLASSES } from "@/constants/filters";

interface FilterByCategoryProps {
  categoryOptions: string[];
  selectedCategories: string[];
  onToggleCategory: (category: string) => void;
  onResetFilters: () => void;
}

const FilterByCategory = ({
  categoryOptions,
  selectedCategories,
  onToggleCategory,
  onResetFilters,
}: FilterByCategoryProps) => {
  return (
    <div className="filter-div mb-4">
      <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Filter by Category
      </h3>

      {/* "All" Checkbox */}
      <div className="mb-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={selectedCategories.length === 0}
            onChange={() => {
              onResetFilters();
            }}
            className={CHECKBOX_CLASSES}
            aria-label="Show all categories"
          />
          <span className="text-xs text-gray-700 dark:text-gray-300">All</span>
        </label>
      </div>

      <div className="flex flex-col gap-2">
        {categoryOptions.map((category) => (
          <label
            key={category}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => onToggleCategory(category)}
              className={CHECKBOX_CLASSES}
              aria-label={`Filter by category ${category}`}
            />
            <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">
              {category}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByCategory;
