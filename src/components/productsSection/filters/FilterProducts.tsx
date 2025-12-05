"use client";

import { FilterProductsProps } from "@/src/types/filterProduct";
import React from "react";
import { FilterDrawer } from "../../extras/FilterDrawer";
import FiltersSidebarContent from "./FiltersSidebarContent";

const FilterProducts: React.FC<FilterProductsProps> = (props) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col sticky-filter-sidebar border-r border-gray-200 dark:border-gray-800 p-6 pb-6 pt-4 xl:pt-6 h-[calc(100vh-133px)]">
        <FiltersSidebarContent {...props} />
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden p-6 pb-0 pt-2">
        <FilterDrawer {...props} />
      </div>
    </>
  );
};

export default FilterProducts;
