import React from "react";

interface FilterByColorProps {
  selectedColors: string[]; // Array of selected colors
  handleColorChange: (color: string) => void; // Function to handle color change
}

const FilterByColor: React.FC<FilterByColorProps> = ({
  selectedColors,
  handleColorChange,
}) => {
  return (
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
  );
};

export default FilterByColor;
