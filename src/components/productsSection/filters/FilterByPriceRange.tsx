import React from "react";

interface FilterByPriceRangeProps {
  selectedPriceRange: string[]; // Array of selected price ranges
  handlePriceRangeChange: (range: string) => void; // Function to handle price range change
}

const FilterByPriceRange: React.FC<FilterByPriceRangeProps> = ({
  selectedPriceRange,
  handlePriceRangeChange,
}) => {
  return (
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
  );
};

export default FilterByPriceRange;
