"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
  DrawerClose, // Import DrawerClose
} from "@/components/ui/drawer";
import { ProductFilterValues } from "@/types/filterProduct";
import { FilterIcon, X } from "lucide-react"; // Import the X icon
import FiltersSidebarContent from "../home/filters-panel/FiltersSidebarContent";
import type { SelectOption } from "@/types/filterProduct";

interface FilterDrawerProps {
  categoryOptions: string[];
  priceRangeOptions: string[];
  colorOptions: string[];
  sortOptions: SelectOption[];
  filterValues: ProductFilterValues;
  onToggleCategory: (category: string) => void;
  onTogglePriceRange: (priceRange: string) => void;
  onToggleColor: (color: string) => void;
  onSortByPrice: (order: "asc" | "desc") => void;
  onResetFilters: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = (props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="bg-card flex justify-center items-center"
        >
          <span className="mr-2">
            <FilterIcon />
          </span>
          Filter Products
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="relative mx-auto w-full max-w-sm overflow-y-auto">
          {/* Close Button */}
          <div className="absolute top-2 right-4 z-10">
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>

          <DrawerHeader className="pb-0 pt-8">
            <DrawerTitle className="text-3xl">Filters</DrawerTitle>
            <DrawerDescription className="sr-only">
              Filter products by category, price, color, and sort order
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-6 px-8">
            <FiltersSidebarContent {...props} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
