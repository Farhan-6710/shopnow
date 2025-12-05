import { FilterProductsProps } from "@/src/types/filterProduct";
import React from "react";
import FilterByCategory from "./FilterByCategory";
import FilterBySort from "./FilterBySort";
import FilterByColor from "./FilterByColor";
import FilterByPriceRange from "./FilterByPriceRange";

const FiltersSidebarContent: React.FC<FilterProductsProps> = (props) => {
  const {
    availableCategories,
    filterValues,
    onToggleCategory,
    onTogglePriceRange,
    onToggleColor,
    onResetFilters,
    onSortByPrice,
  } = props;
  return (
    <div className="flex flex-col justify-between">
      {/* Filter by Category */}
      <FilterByCategory
        availableCategories={availableCategories}
        selectedCategories={filterValues.selectedCategories}
        onToggleCategory={onToggleCategory}
        onResetFilters={onResetFilters}
      />

      {/* Filter by Sort */}
      <FilterBySort
        selectedSort={filterValues.selectedSort}
        onSortByPrice={onSortByPrice}
      />

      {/* Filter by Price Range */}
      <FilterByPriceRange
        selectedPriceRanges={filterValues.selectedPriceRanges}
        onTogglePriceRange={onTogglePriceRange}
      />

      {/* Filter by Color */}
      <FilterByColor
        selectedColors={filterValues.selectedColors}
        onToggleColor={onToggleColor}
      />

      {/* Reset Filters Button */}
      <button
        onClick={onResetFilters}
        className="mt-2 px-4 py-2.5 text-sm font-medium text-white bg-slate-950 dark:bg-slate-800 hover:bg-red-600 dark:hover:bg-red-600 rounded-md transition-all duration-150"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FiltersSidebarContent;
