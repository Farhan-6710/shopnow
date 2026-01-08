"use client";

import { useState, useMemo, useCallback } from "react";
import { showToast } from "@/config/ToastConfig";

import { ProductFilterValues } from "@/types/filterProduct";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/redux/slices/cartSlice";
import { Product } from "@/types/product";

export const useFilterProducts = (products: Product[] | undefined) => {
  const currency = useSelector(selectCurrency);
  const [filterValues, setFilterValues] = useState<ProductFilterValues>({
    selectedCategories: [],
    selectedPriceRange: [],
    selectedColors: [],
    selectedSort: "",
  });

  // Calculate filtered & sorted products with useMemo
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const filtered = products.filter((product: Product) => {
      const categoryMatch =
        !filterValues.selectedCategories.length ||
        filterValues.selectedCategories.includes(product.category || "");

      const priceMatch =
        !filterValues.selectedPriceRange.length ||
        filterValues.selectedPriceRange.includes(product.priceRange || "");

      const colorMatch =
        !filterValues.selectedColors.length ||
        filterValues.selectedColors.includes(product.color || "");

      return categoryMatch && priceMatch && colorMatch;
    });

    // Apply sorting
    if (!filterValues.selectedSort) return filtered;

    return [...filtered].sort((a, b) => {
      const priceA = a.prices[currency] || a.prices.USD;
      const priceB = b.prices[currency] || b.prices.USD;
      return filterValues.selectedSort === "asc"
        ? priceA - priceB
        : priceB - priceA;
    });
  }, [
    products,
    filterValues.selectedCategories,
    filterValues.selectedPriceRange,
    filterValues.selectedColors,
    filterValues.selectedSort,
    currency,
  ]);

  // Wrap handlers in useCallback to prevent unnecessary re-creations
  const onToggleCategory = useCallback(async (category: string) => {
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      selectedCategories: prevFilters.selectedCategories.includes(category)
        ? prevFilters.selectedCategories.filter((c) => c !== category)
        : [...prevFilters.selectedCategories, category],
    }));
  }, []);

  const onTogglePriceRange = useCallback(async (priceRange: string) => {
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      selectedPriceRange: prevFilters.selectedPriceRange.includes(priceRange)
        ? prevFilters.selectedPriceRange.filter((r) => r !== priceRange)
        : [...prevFilters.selectedPriceRange, priceRange],
    }));
  }, []);

  const onToggleColor = useCallback(async (color: string) => {
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      selectedColors: prevFilters.selectedColors.includes(color)
        ? prevFilters.selectedColors.filter((c) => c !== color)
        : [...prevFilters.selectedColors, color],
    }));
  }, []);

  const onSortByPrice = useCallback(async (order: "asc" | "desc") => {
    setFilterValues((prev) => ({
      ...prev,
      selectedSort: prev.selectedSort === order ? "" : order,
    }));
  }, []);

  const onResetFilters = useCallback(async () => {
    setFilterValues({
      selectedCategories: [],
      selectedPriceRange: [],
      selectedColors: [],
      selectedSort: "",
    });
    showToast({
      type: "success",
      title: "Filters Reset",
      description: "All filters have been cleared",
    });
  }, []);

  return {
    filteredProducts,
    filterValues,
    onToggleCategory,
    onTogglePriceRange,
    onToggleColor,
    onSortByPrice,
    onResetFilters,
  };
};
