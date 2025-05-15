import React from "react";

interface handleResetFilter {
  categories: string[];
  selectedCategory: string[];
  handleCategoryChange: (category: string) => void;
  handleSortWithPrice: (sort: "asc" | "desc") => void;
  selectedSort: String | undefined;
  setSelectedSort: (value: string) => void;
  handleResetFilter: () => void;
}

const FilterByCategory: React.FC<handleResetFilter> = ({
  categories,
  selectedCategory,
  handleCategoryChange,
  handleResetFilter,
}) => {
  return (
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
            <span className="text-gray-700 dark:text-gray-300">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterByCategory;
