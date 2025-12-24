// src/types/product.ts

export interface Product {
  id: number;
  productName: string;
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
