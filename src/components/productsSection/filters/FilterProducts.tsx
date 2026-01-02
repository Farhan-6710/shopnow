"use client";

import { ProductFilterValues } from "@/types/filterProduct";
import React from "react";
import { FilterSheet } from "../../extras/FilterSheet";
import FiltersSidebarContent from "./FiltersSidebarContent";
import SearchBar from "@/components/headers/headerTwo/SearchBar";
import { PRODUCTS_DATA } from "@/constants/products";
import { motion } from "framer-motion";

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

console.log("filters rendered");

const FilterProducts: React.FC<FilterProductsProps> = (props) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -180 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="w-70 bg-card hidden md:flex md:flex-col sticky-filter-sidebar border-r border-border p-6 pb-6 pt-4 xl:pt-6 h-[calc(100vh-133px)]"
        aria-label="Product filters"
      >
        <FiltersSidebarContent {...props} />
      </motion.aside>

      {/* Mobile Sheet */}
      <div
        className="flex flex-col gap-3 md:hidden p-4 pb-0 pt-1"
        role="region"
        aria-label="Filter controls"
      >
        <SearchBar products={PRODUCTS_DATA} />
        <FilterSheet {...props} />
      </div>
    </>
  );
};

export default React.memo(FilterProducts);
