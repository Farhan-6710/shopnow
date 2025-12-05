"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { PRODUCTS_DATA } from "@/src/constants/products";
import { PRICE_RANGES } from "@/src/constants/filters";
import { Product } from "@/src/types/product";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

interface ProductFilterValues {
  selectedCategories: string[];
  selectedPriceRanges: string[];
  selectedColors: string[];
  selectedSort: "asc" | "desc" | "";
}

export const useFilterProducts = () => {
  const currency = useSelector((state: RootState) => state.cart.currency);
  const [filteredProducts, setfilteredProducts] = useState<Product[]>([]);
  const [filterValues, setFilterValues] = useState<ProductFilterValues>({
    selectedCategories: [],
    selectedPriceRanges: [],
    selectedColors: [],
    selectedSort: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const cheapPrice = PRICE_RANGES.cheap[currency];
    const affordablePrice = PRICE_RANGES.affordable[currency];

    const filtered = PRODUCTS_DATA.filter((product) => {
      // Category filter
      const categoryMatch =
        filterValues.selectedCategories.length === 0 ||
        filterValues.selectedCategories.includes(product.category || "");

      // Price filter
      const productPrice = product.prices[currency] || product.prices.USD;
      const priceMatch =
        filterValues.selectedPriceRanges.length === 0 ||
        filterValues.selectedPriceRanges.some((range) => {
          if (range === "cheap") return productPrice <= cheapPrice;
          if (range === "affordable")
            return productPrice > cheapPrice && productPrice <= affordablePrice;
          if (range === "expensive") return productPrice > affordablePrice;
          return false;
        });

      // Color filter
      const colorMatch =
        filterValues.selectedColors.length === 0 ||
        filterValues.selectedColors.includes(product.color || "");

      return categoryMatch && priceMatch && colorMatch;
    });

    // Apply sorting if a sort option is selected
    if (filterValues.selectedSort) {
      filtered.sort((a, b) => {
        const priceA = a.prices[currency] || a.prices.USD;
        const priceB = b.prices[currency] || b.prices.USD;
        return filterValues.selectedSort === "asc"
          ? priceA - priceB
          : priceB - priceA;
      });
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      setfilteredProducts(filtered);
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer); // Cleanup
  }, [
    filterValues.selectedCategories,
    filterValues.selectedPriceRanges,
    filterValues.selectedColors,
    filterValues.selectedSort,
    currency,
  ]);

  const onToggleCategory = (category: string) => {
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      selectedCategories: prevFilters.selectedCategories.includes(category)
        ? prevFilters.selectedCategories.filter((c) => c !== category)
        : [...prevFilters.selectedCategories, category],
    }));
  };

  const onTogglePriceRange = (priceRange: string) => {
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      selectedPriceRanges: prevFilters.selectedPriceRanges.includes(priceRange)
        ? prevFilters.selectedPriceRanges.filter((r) => r !== priceRange)
        : [...prevFilters.selectedPriceRanges, priceRange],
    }));
  };

  const onToggleColor = (color: string) => {
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      selectedColors: prevFilters.selectedColors.includes(color)
        ? prevFilters.selectedColors.filter((c) => c !== color)
        : [...prevFilters.selectedColors, color],
    }));
  };

  const onSortByPrice = useCallback((order: "asc" | "desc") => {
    setFilterValues((prev) => ({
      ...prev,
      selectedSort: prev.selectedSort === order ? "" : order, // Toggle: unselect if clicking same option
    }));
  }, []);

  const onResetFilters = useCallback(() => {
    setFilterValues({
      selectedCategories: [],
      selectedPriceRanges: [],
      selectedColors: [],
      selectedSort: "",
    });
  }, []);

  // Compute once - this never changes since PRODUCTS_DATA is static
  const availableCategories = useMemo(
    () => Array.from(new Set(PRODUCTS_DATA.map((p) => p.category || ""))),
    []
  );

  return {
    filteredProducts,
    isLoading,
    filterValues,
    availableCategories,
    onToggleCategory,
    onTogglePriceRange,
    onToggleColor,
    onSortByPrice,
    onResetFilters,
  };
};
