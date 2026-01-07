"use client";

import { ProductFilterValues } from "@/types/filterProduct";
import React from "react";
import { FilterSheet } from "../../extras/FilterSheet";
import FiltersSidebarContent from "./FiltersSidebarContent";
import SearchBar from "@/components/headers/headerTwo/SearchBar";
import { motion } from "framer-motion";
import { Product } from "@/types/product";

interface ProductsFiltersPanelProps {
  products: Product[];
  filterValues: ProductFilterValues;
  onToggleCategory: (category: string) => void;
  onTogglePriceRange: (priceRange: string) => void;
  onToggleColor: (color: string) => void;
  onSortByPrice: (order: "asc" | "desc") => void;
  onResetFilters: () => void;
}

const ProductsFiltersPanel: React.FC<ProductsFiltersPanelProps> = ({
  products,
  ...props
}) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="w-70 bg-card hidden md:flex md:flex-col sticky-filter-sidebar border-r border-border p-6 pb-6 pt-4 xl:pt-6 h-[calc(100vh-133px)]"
        aria-label="Product filters"
      >
        <FiltersSidebarContent {...props} />
      </aside>

      {/* Mobile Sheet */}
      <div
        className="flex flex-col gap-3 md:hidden p-4 pb-0 pt-4"
        role="region"
        aria-label="Filter controls"
      >
        <SearchBar products={products} />
        <FilterSheet {...props} />
      </div>
    </>
  );
};

export default React.memo(ProductsFiltersPanel);
