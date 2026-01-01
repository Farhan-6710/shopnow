"use client";

import { useState, useMemo, useCallback } from "react";
import {
  COLOR_OPTIONS,
  PRICE_RANGE_OPTIONS,
  CATEGORY_OPTIONS,
  SORT_OPTIONS,
} from "@/constants/filters";
import { showToast } from "@/config/ToastConfig";
import { timeout } from "@/utils/timeout";

import { ProductFilterValues } from "@/types/filterProduct";
import { useSelector } from "react-redux";
import { selectCurrency } from "@/redux/cart/cartSlice";
import { useFetchProducts } from "./useFetchProducts";

export const useFilterProducts = () => {
  const currency = useSelector(selectCurrency);
  const [filterValues, setFilterValues] = useState<ProductFilterValues>({
    selectedCategories: [],
    selectedPriceRange: [],
    selectedColors: [],
    selectedSort: "",
  });

  const {
    data: products,
    isLoading: isProductsLoading,
    error,
  } = useFetchProducts();

  // Calculate filtered & sorted products with useMemo
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    const filtered = products.filter((product) => {
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

  const [isFilterLoading, setIsFilterLoading] = useState(false);

  // Wrap handlers in useCallback to prevent unnecessary re-creations
  const onToggleCategory = useCallback(async (category: string) => {
    setIsFilterLoading(true);
    await timeout(700);
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      selectedCategories: prevFilters.selectedCategories.includes(category)
        ? prevFilters.selectedCategories.filter((c) => c !== category)
        : [...prevFilters.selectedCategories, category],
    }));
    setIsFilterLoading(false);
  }, []);

  const onTogglePriceRange = useCallback(async (priceRange: string) => {
    setIsFilterLoading(true);
    await timeout(700);
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      selectedPriceRange: prevFilters.selectedPriceRange.includes(priceRange)
        ? prevFilters.selectedPriceRange.filter((r) => r !== priceRange)
        : [...prevFilters.selectedPriceRange, priceRange],
    }));
    setIsFilterLoading(false);
  }, []);

  const onToggleColor = useCallback(async (color: string) => {
    setIsFilterLoading(true);
    await timeout(700);
    setFilterValues((prevFilters) => ({
      ...prevFilters,
      selectedColors: prevFilters.selectedColors.includes(color)
        ? prevFilters.selectedColors.filter((c) => c !== color)
        : [...prevFilters.selectedColors, color],
    }));
    setIsFilterLoading(false);
  }, []);

  const onSortByPrice = useCallback(async (order: "asc" | "desc") => {
    setIsFilterLoading(true);
    await timeout(700);
    setFilterValues((prev) => ({
      ...prev,
      selectedSort: prev.selectedSort === order ? "" : order,
    }));
    setIsFilterLoading(false);
  }, []);

  const onResetFilters = useCallback(async () => {
    setIsFilterLoading(true);
    await timeout(700);
    setFilterValues({
      selectedCategories: [],
      selectedPriceRange: [],
      selectedColors: [],
      selectedSort: "",
    });
    setIsFilterLoading(false);
    showToast({
      type: "success",
      title: "Filters Reset",
      description: "All filters have been cleared",
    });
  }, []);

  // Use derived constant
  const categoryOptions = CATEGORY_OPTIONS;
  const priceRangeOptions = PRICE_RANGE_OPTIONS;
  const colorOptions = COLOR_OPTIONS;
  const sortOptions = SORT_OPTIONS;

  return {
    filteredProducts,
    productsFromApiRes: products || [],
    isLoading: isProductsLoading || isFilterLoading,
    error,
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
