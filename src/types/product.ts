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
  status?: "available" | "unavailable" | "preorder";
  brand?: string;
  description: string;
  priceRange?: string;
  tags?: string[];
}
