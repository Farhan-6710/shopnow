import React from "react";

interface FilterProductsProps {
  categories: string[];
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
  handleResetFilter: () => void;
  filteredProductCount: number;
}

const FilterProducts: React.FC<FilterProductsProps> = ({
  categories,
  selectedCategory,
  handleCategoryChange,
  handleResetFilter,
  filteredProductCount,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="filter-div">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
          Filter by Category
        </h3>
        <div className="flex flex-wrap gap-4">
          {/* "All" Checkbox */}
          <label key="all" className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedCategory === ""} // All will be selected if there's no category
              onChange={handleResetFilter}
              className="form-checkbox rounded-lg text-primary dark:text-primary dark:bg-primary focus:ring-0 focus:ring-offset-0 w-6 h-6"
            />
            <span className="text-gray-700 dark:text-gray-300">All</span>
          </label>

          {/* Category checkboxes */}
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() =>
                  selectedCategory === category
                    ? handleResetFilter()
                    : handleCategoryChange(category)
                }
                className="form-checkbox rounded-lg text-primary dark:text-primary dark:bg-primary focus:ring-0 focus:ring-offset-0 w-6 h-6"
              />
              <span className="text-gray-700 dark:text-gray-300">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Display filtered item count */}
      <div className="items-counter">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300 mb-4">
          {filteredProductCount} Items match your filter
        </h3>
      </div>
    </div>
  );
};

export default FilterProducts;
