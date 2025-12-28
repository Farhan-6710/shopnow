"use client";

import { useState, useEffect, useMemo } from "react";
import {
  COLOR_OPTIONS,
  PRICE_RANGE_OPTIONS,
  CATEGORY_OPTIONS,
  SORT_OPTIONS,
} from "@/constants/filters";
import { showToast } from "@/config/ToastConfig";
import { RotateCcw } from "lucide-react";

import { ProductFilterValues } from "@/types/filterProduct";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useFetchProducts } from "./useFetchProducts";

export const useFilterProducts = () => {
  const currency = useSelector((state: RootState) => state.cart.currency);
  const [filterValues, setFilterValues] = useState<ProductFilterValues>({
    selectedCategories: [],
    selectedPriceRange: [],
    selectedColors: [],
    selectedSort: "",
  });
  const [isFilterLoading, setIsFilterLoading] = useState(false);

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

  // Show loading when filters change
  useEffect(() => {
    setIsFilterLoading(true);
    const timer = setTimeout(() => setIsFilterLoading(false), 700);
    return () => clearTimeout(timer);
  }, [filteredProducts]);

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

  const onSortByPrice = (order: "asc" | "desc") => {
    setFilterValues((prev) => ({
      ...prev,
      selectedSort: prev.selectedSort === order ? "" : order,
    }));
  };

  const onResetFilters = () => {
    setFilterValues({
      selectedCategories: [],
      selectedPriceRange: [],
      selectedColors: [],
      selectedSort: "",
    });
    showToast({
      type: "custom",
      title: "Filters Reset",
      description: "All filters have been cleared",
      icon: RotateCcw,
    });
  };

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
