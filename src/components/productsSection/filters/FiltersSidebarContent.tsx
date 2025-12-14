import { ProductFilterValues } from "@/src/types/filterProduct";
import React from "react";
import FilterByCategory from "./FilterByCategory";
import FilterBySort from "./FilterBySort";
import FilterByColor from "./FilterByColor";
import FilterByPriceRange from "./FilterByPriceRange";

interface FiltersSidebarContentProps {
  categoryOptions: string[];
  priceRangeOptions: string[];
  colorOptions: string[];
  sortOptions: { value: string; label: string }[];
  filterValues: ProductFilterValues;
  onToggleCategory: (category: string) => void;
  onTogglePriceRange: (priceRange: string) => void;
  onToggleColor: (color: string) => void;
  onSortByPrice: (order: "asc" | "desc") => void;
  onResetFilters: () => void;
}

const FiltersSidebarContent: React.FC<FiltersSidebarContentProps> = (props) => {
  const {
    categoryOptions,
    priceRangeOptions,
    colorOptions,
    sortOptions,
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
        categoryOptions={categoryOptions}
        selectedCategories={filterValues.selectedCategories}
        onToggleCategory={onToggleCategory}
        onResetFilters={onResetFilters}
      />

      {/* Filter by Sort */}
      <FilterBySort
        sortOptions={sortOptions}
        selectedSort={filterValues.selectedSort}
        onSortByPrice={onSortByPrice}
      />

      {/* Filter by Price Range */}
      <FilterByPriceRange
        priceRangeOptions={priceRangeOptions}
        selectedPriceRanges={filterValues.selectedPriceRange}
        onTogglePriceRange={onTogglePriceRange}
      />

      {/* Filter by Color */}
      <FilterByColor
        colorOptions={colorOptions}
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
