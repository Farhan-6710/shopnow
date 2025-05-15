"use client";

import { FilterProductsProps } from "@/types/filterDrawer";
import React, { useState } from "react";
import FilterByCategory from "./FilterByCategory";
import FilterBySort from "./FilterBySort";
import FilterByPriceRange from "./FilterByPriceRange";
import FilterByColor from "./FilterByColor";

const FilterProducts: React.FC<FilterProductsProps> = ({
  categories,
  filters,
  handleCategoryChange,
  handlePriceRangeChange,
  handleColorChange,
  handleResetFilter,
  handleSortWithPrice,
}) => {
  const [selectedSort, setSelectedSort] = useState("");

  return (
    <div className="flex flex-col justify-between">
      {/* Filter by Sort */}
      <FilterBySort
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        handleSortWithPrice={handleSortWithPrice}
      />
      {/* Filter by Category */}
      <FilterByCategory
        categories={categories}
        selectedCategory={filters.selectedCategory}
        handleCategoryChange={handleCategoryChange}
        handleSortWithPrice={handleSortWithPrice}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        handleResetFilter={handleResetFilter}
      />

      {/* Filter by Price Range */}
      <FilterByPriceRange
        selectedPriceRange={filters.selectedPriceRange}
        handlePriceRangeChange={handlePriceRangeChange}
      />

      {/* Filter by Color */}
      <FilterByColor
        selectedColors={filters.selectedColors}
        handleColorChange={handleColorChange}
      />

      {/* Reset Filters Button */}
      <button
        onClick={handleResetFilter}
        className="px-4 py-2 text-sm font-semibold text-white bg-slate-950 dark:bg-slate-800 hover:bg-red-600 dark:hover:bg-red-600 rounded-lg transition-all duration-100"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterProducts;
