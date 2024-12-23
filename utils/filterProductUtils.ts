// src/utils/productUtils.ts

import { Product } from "@/types/product";
import { FilterState } from "@/types/product";

export const filterProducts = (
  productsData: Product[],
  filters: FilterState,
  currency: "USD" | "INR" // Explicitly define possible currency values
): Product[] => {
  const priceRanges = {
    cheap: { USD: 20, INR: 500 },
    affordable: { USD: 39, INR: 2500 },
    expensive: { USD: 39, INR: 2500 },
  };

  const cheapPrice = priceRanges.cheap[currency];
  const affordablePrice = priceRanges.affordable[currency];

  return productsData.filter((product) => {

    // Ensure category and color are defined
    const category = product.category || "";
    const color = product.color || "";

    const matchesCategory =
      filters.selectedCategory.length === 0 ||
      filters.selectedCategory.includes(category);

    const productPrice = product.prices[currency] || product.prices.USD;

    let matchesPrice = true;
    if (filters.selectedPriceRange.length > 0) {
      matchesPrice = filters.selectedPriceRange.some((range) => {
        if (range === "cheap") {
          return productPrice <= cheapPrice;
        } else if (range === "affordable") {
          return productPrice > cheapPrice && productPrice <= affordablePrice;
        } else if (range === "expensive") {
          return productPrice > affordablePrice;
        }
        return false;
      });
    }

    const matchesColor =
      filters.selectedColors.length === 0 ||
      filters.selectedColors.includes(color);

    return matchesCategory && matchesPrice && matchesColor;
  });
};
