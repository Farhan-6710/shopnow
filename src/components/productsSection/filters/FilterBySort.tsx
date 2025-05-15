import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import React from "react";

interface FilterBySortProps {
  selectedSort: string | undefined;
  setSelectedSort: (value: string) => void;
  handleSortWithPrice: (sort: "asc" | "desc") => void;
}

const FilterBySort: React.FC<FilterBySortProps> = ({
  selectedSort,
  setSelectedSort,
  handleSortWithPrice,
}) => {
  return (
    <div className="filter-div">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
        Sort by Price
      </h3>
      <div className="mb-4">
        <Select
          onValueChange={(value) => {
            setSelectedSort(value);
            handleSortWithPrice(value as "asc" | "desc");
          }}
        >
          <SelectTrigger className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white">
            <SelectValue
              placeholder={
                selectedSort
                  ? selectedSort === "asc"
                    ? "Price: Low to High"
                    : "Price: High to Low"
                  : "Select Sorting"
              }
            />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-900 shadow-lg rounded-lg">
            <SelectGroup>
              <SelectLabel className="px-3 py-2 text-gray-700 dark:text-gray-300">
                Select Sorting
              </SelectLabel>
              <SelectItem
                value="asc"
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Price: Low to High
              </SelectItem>
              <SelectItem
                value="desc"
                className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Price: High to Low
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBySort;
