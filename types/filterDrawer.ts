// Define the types for each prop
export interface FilterProductsProps {
  categories: string[]; // Assuming categories is an array of strings (you can adjust based on your actual data type)
  filters: {
    selectedCategory: string[];
    selectedPriceRange: string[];
    selectedColors: string[];
  };
  handleCategoryChange: (category: string) => void;
  handlePriceRangeChange: (priceRange: string) => void;
  handleColorChange: (color: string) => void;
  handleSortWithPrice: (order: "asc" | "desc") => void;
  handleResetFilter: () => void;
}
