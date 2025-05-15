import React from "react";

interface FilterProductsProps {
  categories: string[];
  selectedCategory: string[]; // Array to allow multiple selections
  selectedPriceRange: string[]; // Array to allow multiple selections
  selectedColors: string[]; // Array to allow multiple selections
  handleCategoryChange: (category: string) => void; // Function to handle category selection
  handlePriceRangeChange: (priceRange: string) => void; // Function to handle price range selection
  handleColorChange: (color: string) => void; // Function to handle color changes
  handleResetFilter: () => void; // Reset filters function
  filteredProductCount: number; // Number of products that match the filters
}

const FilterProducts: React.FC<FilterProductsProps> = ({
  categories,
  selectedCategory,
  selectedPriceRange,
  selectedColors,
  handleCategoryChange,
  handlePriceRangeChange,
  handleColorChange,
  handleResetFilter,
}) => {
  return (
    <div className="flex flex-col justify-between">
      {/* Filter by Category */}
      <div className="filter-div mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Filter by Category
        </h3>

        <div>
          {/* implement a sorting filter here and it must be a dropdown giving three options , price */}
        </div>

        <div className="flex flex-col flex-wrap gap-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedCategory.includes(category)} // Check if the category is selected
                onChange={() => handleCategoryChange(category)} // Handle category change
                className="rounded-lg text-primary bg-white dark:text-primary dark:bg-primary focus:ring-0 focus:ring-offset-0 w-6 h-6 appearance-none border border-gray-300 dark:border-gray-600 checked:bg-primary checked:border-primary dark:checked:bg-gray-100 dark:checked:border-gray-100"
              />
              <span className="text-gray-700 dark:text-gray-300">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Reset Filters Button */}
      <button
        onClick={handleResetFilter}
        className="px-4 py-2 text-sm font-semibold text-white bg-slate-950 dark:bg-slate-800 hover:bg-red-600 dark:hover:bg-red-600 rounded-lg transition-all duration-100"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterProducts;
