// Define the types for each prop
export interface FilterDrawerProps {
  categories: string[]; // Assuming categories is an array of strings (you can adjust based on your actual data type)
  selectedCategory: string[];
  selectedPriceRange: string[]; // Adjust to the actual type
  selectedColors: string[]; // Assuming it's an array of strings
  handleCategoryChange: (category: string) => void;
  handlePriceRangeChange: (priceRange: string) => void;
  handleColorChange: (color: string) => void;
  handleResetFilter: () => void;
  filteredProductCount: number;
}