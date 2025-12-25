// src/types/product.ts

export interface Product {
  id: number;
  name: string;
  category?: string;
  prices: {
    USD: number;
    INR: number;
  };
  color?: string;
  imgSource: string;
  rating?: number;
  brand?: string;
  description: string;
  priceRange?: string;
}
