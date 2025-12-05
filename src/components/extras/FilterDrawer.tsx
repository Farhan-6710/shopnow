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
import { FilterProductsProps } from "@/src/types/filterProduct";
import { FilterIcon, X } from "lucide-react"; // Import the X icon
import FiltersSidebarContent from "../productsSection/filters/FiltersSidebarContent";

export const FilterDrawer: React.FC<FilterProductsProps> = (props) => {
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
        <div className="relative mx-auto w-full max-w-sm">
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
