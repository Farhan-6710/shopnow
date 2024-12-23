// src/types/product.ts

export interface Product {
  id: number;
  productName: string;
  category?: string;
  prices: {
    USD: number;
    INR: number;
  };
  color?: string;  // Add the color property
  imgSource: string;
  rating?: number;
}

export interface FilterState {
  selectedCategory: string[];
  selectedPriceRange: string[];
  selectedColors: string[];
}