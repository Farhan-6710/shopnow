import React from "react";
import { CHECKBOX_CLASSES } from "@/constants/filters";

interface FilterBySortProps {
  sortOptions: { value: string; label: string }[];
  selectedSort: "asc" | "desc" | "";
  onSortByPrice: (sort: "asc" | "desc") => void;
}

const FilterBySort = ({
  sortOptions,
  selectedSort,
  onSortByPrice,
}: FilterBySortProps) => {
  return (
    <div className="filter-div mb-4">
      <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Sort by Price
      </h3>
      <div className="space-y-2">
        {sortOptions.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedSort === option.value}
              onChange={() => onSortByPrice(option.value as "asc" | "desc")}
              className={CHECKBOX_CLASSES}
              aria-label={`Sort by ${option.label.toLowerCase()}`}
            />
            <span className="text-xs text-gray-700 dark:text-gray-300">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterBySort;
