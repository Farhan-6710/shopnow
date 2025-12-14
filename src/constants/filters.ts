// Filter constants
import { PRODUCTS_DATA } from "@/src/constants/products";

export const PRICE_RANGE_OPTIONS: string[] = [
  ...new Set(PRODUCTS_DATA.map((product) => product.priceRange || ""))
].filter(Boolean);

export const COLOR_OPTIONS: string[] = [
  ...new Set(PRODUCTS_DATA.map((product) => product.color || ""))
].filter(Boolean);

export const CATEGORY_OPTIONS: string[] = [
  ...new Set(PRODUCTS_DATA.map((product) => product.category || ""))
].filter(Boolean);

export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "asc", label: "Price: Low to High" },
  { value: "desc", label: "Price: High to Low" },
] as const;

// Shared checkbox styles for consistency
export const CHECKBOX_CLASSES =
  "rounded-lg text-primary text-[14px] bg-white dark:text-primary dark:bg-primary focus:ring-0 focus:ring-offset-0 w-5 h-5 appearance-none border border-gray-300 dark:border-gray-600 checked:bg-primary checked:border-primary dark:checked:bg-gray-100 dark:checked:border-gray-100";
