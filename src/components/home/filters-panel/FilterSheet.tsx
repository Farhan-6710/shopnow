"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ProductFilterValues } from "@/types/filterProduct";
import { FilterIcon } from "lucide-react";
import FiltersSidebarContent from "./FiltersSidebarContent";

interface FilterSheetProps {
  filterValues: ProductFilterValues;
  onToggleCategory: (category: string) => void;
  onTogglePriceRange: (priceRange: string) => void;
  onToggleColor: (color: string) => void;
  onSortByPrice: (order: "asc" | "desc") => void;
  onResetFilters: () => void;
}

export const FilterSheet = (props: FilterSheetProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="outline"
        size="lg"
        className="bg-card flex justify-center items-center w-full"
        onClick={() => setOpen(true)}
      >
        <span className="mr-2">
          <FilterIcon />
        </span>
        Filter Products
      </Button>

      <SheetContent
        side="left"
        className="w-80 sm:w-96 gap-0 flex flex-col overflow-hidden"
      >
        <SheetHeader className="pb-4 border-b border-border shrink-0">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>
            Filter products by search, category, price, color, and sort order
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable content area - SearchBar fixed at top */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-4">
            <FiltersSidebarContent {...props} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
