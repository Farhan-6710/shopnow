// Filter constants

export const PRICE_RANGES = {
  cheap: { USD: 20, INR: 500 },
  affordable: { USD: 39, INR: 2500 },
  expensive: { USD: 39, INR: 2500 },
};

export const PRICE_RANGE_OPTIONS = [
  "cheap",
  "affordable",
  "expensive",
] as const;

export const COLOR_OPTIONS = [
  "white",
  "black",
  "green",
  "blue",
  "red",
] as const;

export const SORT_OPTIONS = [
  { value: "asc", label: "Price: Low to High" },
  { value: "desc", label: "Price: High to Low" },
] as const;

// Shared checkbox styles for consistency
export const CHECKBOX_CLASSES =
  "rounded-lg text-primary text-[14px] bg-white dark:text-primary dark:bg-primary focus:ring-0 focus:ring-offset-0 w-5 h-5 appearance-none border border-gray-300 dark:border-gray-600 checked:bg-primary checked:border-primary dark:checked:bg-gray-100 dark:checked:border-gray-100";
