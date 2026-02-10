import { ProductFilterValues } from "@/types/filterProduct";
import React, { useState } from "react";
import FilterByCategory from "./FilterByCategory";
import FilterBySort from "./FilterBySort";
import FilterByColor from "./FilterByColor";
import FilterByPriceRange from "./FilterByPriceRange";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { RotateCcw } from "lucide-react";
import {
  COLOR_OPTIONS,
  PRICE_RANGE_OPTIONS,
  CATEGORY_OPTIONS,
  SORT_OPTIONS,
} from "@/constants/filters";

interface FiltersSidebarContentProps {
  filterValues: ProductFilterValues;
  onToggleCategory: (category: string) => void;
  onTogglePriceRange: (priceRange: string) => void;
  onToggleColor: (color: string) => void;
  onSortByPrice: (order: "asc" | "desc") => void;
  onResetFilters: () => void;
}

const FiltersSidebarContent = (props: FiltersSidebarContentProps) => {
  const {
    filterValues,
    onToggleCategory,
    onTogglePriceRange,
    onToggleColor,
    onResetFilters,
    onSortByPrice,
  } = props;

  const [showResetModal, setShowResetModal] = useState(false);

  const hasActiveFilters =
    filterValues.selectedCategories.length > 0 ||
    filterValues.selectedPriceRange.length > 0 ||
    filterValues.selectedColors.length > 0 ||
    filterValues.selectedSort !== "";

  const handleResetClick = () => {
    if (hasActiveFilters) {
      setShowResetModal(true);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      {/* Filter by Category */}
      <FilterByCategory
        categoryOptions={CATEGORY_OPTIONS}
        selectedCategories={filterValues.selectedCategories}
        onToggleCategory={onToggleCategory}
        onResetFilters={onResetFilters}
      />

      {/* Filter by Sort */}
      <FilterBySort
        sortOptions={SORT_OPTIONS}
        selectedSort={filterValues.selectedSort}
        onSortByPrice={onSortByPrice}
      />

      {/* Filter by Price Range */}
      <FilterByPriceRange
        priceRangeOptions={PRICE_RANGE_OPTIONS}
        selectedPriceRanges={filterValues.selectedPriceRange}
        onTogglePriceRange={onTogglePriceRange}
      />

      {/* Filter by Color */}
      <FilterByColor
        colorOptions={COLOR_OPTIONS}
        selectedColors={filterValues.selectedColors}
        onToggleColor={onToggleColor}
      />

      {/* Reset Filters Button */}
      <Button
        onClick={handleResetClick}
        disabled={!hasActiveFilters}
        className="mt-2 px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-red-600 hover:text-foreground rounded-md transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Reset all filters"
      >
        Reset Filters
      </Button>

      <ConfirmationModal
        open={showResetModal}
        onOpenChange={setShowResetModal}
        title="Reset Filters"
        description="Are you sure you want to reset all filters? This will clear all your current selections."
        icon={RotateCcw}
        iconClassName="text-destructive"
        confirmLabel="Reset"
        cancelLabel="Cancel"
        variant="destructive"
        onConfirm={onResetFilters}
      />
    </div>
  );
};

export default FiltersSidebarContent;
