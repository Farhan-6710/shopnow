// Product filter values interface
export interface ProductFilterValues {
  selectedCategories: string[];
  selectedPriceRange: string[];
  selectedColors: string[];
  selectedSort: "asc" | "desc" | "";
}

// Product filter component props
export interface FilterProductsProps {
  availableCategories: string[];
  filterValues: ProductFilterValues;
  onToggleCategory: (category: string) => void;
  onTogglePriceRange: (priceRange: string) => void;
  onToggleColor: (color: string) => void;
  onSortByPrice: (order: "asc" | "desc") => void;
  onResetFilters: () => void;
}

export interface SelectOption {
  value: string;
  label: string;
}
