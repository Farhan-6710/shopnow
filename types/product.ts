// src/types/product.ts

import { COLOR_OPTIONS, PRICE_RANGE_OPTIONS } from "@/src/constants/filters";

// Type-safe color type derived from COLOR_OPTIONS constant
export type ColorType = (typeof COLOR_OPTIONS)[number];

// Type-safe price range type derived from PRICE_RANGE_OPTIONS constant
export type PriceRangeType = (typeof PRICE_RANGE_OPTIONS)[number];

export interface Product {
  id: number;
  productName: string;
  category?: string;
  prices: {
    USD: number;
    INR: number;
  };
  color?: ColorType; // Now type-safe: only allows "white" | "black" | "green" | "blue" | "red"
  imgSource: string;
  rating?: number;
  description: string;
  brand?: string;
  priceRange?: PriceRangeType;
}
