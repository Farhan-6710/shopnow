"use client";

import * as React from "react";
import { Button } from "@/src/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
  DrawerClose, // Import DrawerClose
} from "@/src/components/ui/drawer";
import FilterProducts from "../productsSections/FilterProducts";
import { FilterDrawerProps } from "@/types/filterDrawer";
import { FilterIcon, X } from "lucide-react"; // Import the X icon

export function FilterDrawer({
  categories,
  selectedCategory,
  selectedPriceRange,
  selectedColors,
  handleCategoryChange,
  handlePriceRangeChange,
  handleColorChange,
  handleResetFilter,
  filteredProductCount,
}: FilterDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="dark:bg-gray-800 flex justify-center items-center"
        >
          <span className="mr-2">
            <FilterIcon />
          </span>
          Filter Products
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="relative">
          {" "}
          {/* Make this div relative for absolute positioning */}
          <div className="absolute top-2 right-4 z-10">
            <DrawerClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="pb-0 pt-8">
              <DrawerTitle>
                <div className="text-3xl">Filters</div>
              </DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <div className="p-6 px-8">
              <FilterProducts
                categories={categories}
                selectedCategory={selectedCategory}
                selectedPriceRange={selectedPriceRange}
                selectedColors={selectedColors}
                handleCategoryChange={handleCategoryChange}
                handlePriceRangeChange={handlePriceRangeChange}
                handleColorChange={handleColorChange}
                handleResetFilter={handleResetFilter}
                filteredProductCount={filteredProductCount}
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
