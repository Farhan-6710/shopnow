import { ProductFilterValues } from "@/types/filterProduct";
import React, { useState } from "react";
import FilterByCategory from "./FilterByCategory";
import FilterBySort from "./FilterBySort";
import FilterByColor from "./FilterByColor";
import FilterByPriceRange from "./FilterByPriceRange";
import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/atoms/ConfirmationModal";
import { RotateCcw } from "lucide-react";

interface FiltersSidebarContentProps {
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

const FiltersSidebarContent: React.FC<FiltersSidebarContentProps> = (props) => {
  const {
    categoryOptions,
    priceRangeOptions,
    colorOptions,
    sortOptions,
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
        categoryOptions={categoryOptions}
        selectedCategories={filterValues.selectedCategories}
        onToggleCategory={onToggleCategory}
        onResetFilters={onResetFilters}
      />

      {/* Filter by Sort */}
      <FilterBySort
        sortOptions={sortOptions}
        selectedSort={filterValues.selectedSort}
        onSortByPrice={onSortByPrice}
      />

      {/* Filter by Price Range */}
      <FilterByPriceRange
        priceRangeOptions={priceRangeOptions}
        selectedPriceRanges={filterValues.selectedPriceRange}
        onTogglePriceRange={onTogglePriceRange}
      />

      {/* Filter by Color */}
      <FilterByColor
        colorOptions={colorOptions}
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
        iconClassName="text-primary"
        confirmLabel="Reset"
        cancelLabel="Cancel"
        variant="default"
        onConfirm={onResetFilters}
      />
    </div>
  );
};

export default FiltersSidebarContent;
