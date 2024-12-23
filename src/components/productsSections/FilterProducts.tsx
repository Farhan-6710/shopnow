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
  filteredProductCount,
}) => {
  return (
    <div className="flex flex-col justify-between">
      {/* Filter by Category */}
      <div className="filter-div mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Filter by Category
        </h3>

        {/* "All" Checkbox */}
        <div className="mb-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategory.length === 0} // All will be selected if no category is selected
              onChange={handleResetFilter} // Reset all categories
              className="rounded-lg text-primary bg-white dark:text-primary dark:bg-primary focus:ring-0 focus:ring-offset-0 w-6 h-6 appearance-none border border-gray-300 dark:border-gray-600 checked:bg-primary checked:border-primary dark:checked:bg-gray-100 dark:checked:border-gray-100"
            />
            <span className="text-gray-700 dark:text-gray-300">All</span>
          </label>
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

      {/* Filter by Price Range */}
      <div className="filter-div mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Filter by Price Range
        </h3>
        <div className="flex flex-col flex-wrap gap-2">
          {["cheap", "affordable", "expensive"].map((range) => (
            <label
              key={range}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedPriceRange.includes(range)} // Check if the price range is selected
                onChange={() => handlePriceRangeChange(range)} // Handle price range change
                className="rounded-lg text-primary bg-white dark:text-primary dark:bg-primary focus:ring-0 focus:ring-offset-0 w-6 h-6 appearance-none border border-gray-300 dark:border-gray-600 checked:bg-primary checked:border-primary dark:checked:bg-gray-100 dark:checked:border-gray-100"
              />
              <span className="text-gray-700 dark:text-gray-300">
                {range === "cheap"
                  ? "Cheap"
                  : range === "affordable"
                  ? "Affordable"
                  : "Expensive"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter by Color */}
      <div className="filter-div mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Filter by Color
        </h3>
        <div className="flex flex-wrap gap-2">
          {["white", "black", "green", "blue", "red"].map((color) => (
            <label
              key={color}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="flex flex-col justify-center items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)} // Check if the color is selected
                  onChange={() => handleColorChange(color)} // Handle color change
                  className="rounded-lg text-primary bg-white dark:text-primary dark:bg-primary focus:ring-0 focus:ring-offset-0 w-6 h-6 appearance-none border border-gray-300 dark:border-gray-600 checked:bg-primary checked:border-primary dark:checked:bg-gray-100"
                />
                <span
                  className="h-6 w-6 rounded-full border border-gray-300"
                  style={{
                    backgroundColor: color, // Apply the background color dynamically
                  }}
                ></span>
              </div>
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
