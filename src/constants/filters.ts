// Filter constants
import { PRODUCTS_DATA } from "@/constants/products";

export const PRICE_RANGE_OPTIONS: string[] = [
  ...new Set(PRODUCTS_DATA.map((product) => product.priceRange || "")),
].filter(Boolean);

export const COLOR_OPTIONS: string[] = [
  ...new Set(PRODUCTS_DATA.map((product) => product.color || "")),
].filter(Boolean);

export const CATEGORY_OPTIONS: string[] = [
  ...new Set(PRODUCTS_DATA.map((product) => product.category || "")),
].filter(Boolean);

export const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "desc", label: "High to Low" },
  { value: "asc", label: "Low to High" },
] as const;

// Shared checkbox styles for consistency
export const CHECKBOX_CLASSES =
  "rounded-md text-[14px] bg-white focus:ring-0 focus:ring-offset-0 w-5 h-5 appearance-none border border-muted-foreground/50 bg-background dark:bg-background text-foreground checked:bg-foreground checked:dark:bg-foreground checked:text-background checked:border-foreground cursor-pointer transition-all duration-200! flex-shrink-0 flex-grow-0 before:content-[''] before:block before:bg-background before:dark:bg-background  before:transition-transform before:duration-200!";
