"use client";

import { useState, useEffect, useCallback } from "react";
import { PRODUCTS_DATA } from "@/src/constants/products";
import {
  COLOR_OPTIONS,
  PRICE_RANGE_OPTIONS,
  CATEGORY_OPTIONS,
  SORT_OPTIONS,
} from "@/src/constants/filters";

import { Product } from "@/src/types/product";
import { ProductFilterValues } from "@/src/types/filterProduct";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

export const useFilterProducts = () => {
  const currency = useSelector((state: RootState) => state.cart.currency);
  const [filteredProducts, setfilteredProducts] = useState<Product[]>([]);
  const [filterValues, setFilterValues] = useState<ProductFilterValues>({
    selectedCategories: [],
    selectedPriceRange: [],
    selectedColors: [],
    selectedSort: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const filtered = PRODUCTS_DATA.filter((product) => {
      // Category filter
      const categoryMatch =
        filterValues.selectedCategories.length === 0 ||
        filterValues.selectedCategories.includes(product.category || "");

      // Price filter
      const priceMatch =
        filterValues.selectedPriceRange.length === 0 ||
        filterValues.selectedPriceRange.includes(product.priceRange || "");

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
    filterValues.selectedPriceRange,
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
      selectedPriceRange: prevFilters.selectedPriceRange.includes(priceRange)
        ? prevFilters.selectedPriceRange.filter((r) => r !== priceRange)
        : [...prevFilters.selectedPriceRange, priceRange],
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
      selectedPriceRange: [],
      selectedColors: [],
      selectedSort: "",
    });
  }, []);

  // Use derived constant
  const categoryOptions = CATEGORY_OPTIONS;
  const priceRangeOptions = PRICE_RANGE_OPTIONS;
  const colorOptions = COLOR_OPTIONS;
  const sortOptions = SORT_OPTIONS;

  return {
    filteredProducts,
    isLoading,
    filterValues,
    categoryOptions,
    priceRangeOptions,
    colorOptions,
    sortOptions,
    onToggleCategory,
    onTogglePriceRange,
    onToggleColor,
    onSortByPrice,
    onResetFilters,
  };
};
