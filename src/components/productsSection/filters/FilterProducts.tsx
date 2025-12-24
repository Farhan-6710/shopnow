"use client";

import { ProductFilterValues } from "@/types/filterProduct";
import React from "react";
import { FilterDrawer } from "../../extras/FilterDrawer";
import FiltersSidebarContent from "./FiltersSidebarContent";

interface FilterProductsProps {
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

const FilterProducts: React.FC<FilterProductsProps> = (props) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="bg-card hidden md:flex md:flex-col sticky-filter-sidebar border-r border-border p-6 pb-6 pt-4 xl:pt-6 h-[calc(100vh-133px)]"
        aria-label="Product filters"
      >
        <FiltersSidebarContent {...props} />
      </aside>

      {/* Mobile Drawer */}
      <div
        className="md:hidden p-6 pb-0 pt-4"
        role="region"
        aria-label="Filter controls"
      >
        <FilterDrawer {...props} />
      </div>
    </>
  );
};

export default FilterProducts;
