import { useState, useEffect, useMemo } from "react";
import { productsData } from "@/src/data/productsData";
import { Product } from "@/types/product";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";

// Define the FilterState interface
interface FilterState {
  selectedCategory: string[];
  selectedPriceRange: string[];
  selectedColors: string[];
}

export const useProductFilters = () => {
  const currency = useSelector((state: RootState) => state.cart.currency);
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: [],
    selectedPriceRange: [],
    selectedColors: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const priceRanges = {
      cheap: { USD: 20, INR: 500 },
      affordable: { USD: 39, INR: 2500 },
      expensive: { USD: 39, INR: 2500 },
    };
    const cheapPrice = priceRanges.cheap[currency];
    const affordablePrice = priceRanges.affordable[currency];

    const filtered = productsData.filter((product) => {
      const matchesCategory =
        filters.selectedCategory.length === 0 ||
        filters.selectedCategory.includes(product.category);

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
        filters.selectedColors.includes(product.color);

      return matchesCategory && matchesPrice && matchesColor;
    });

    setLoading(true);
    setTimeout(() => {
      setProducts(filtered);
      setLoading(false);
    }, 700);
  }, [filters.selectedCategory, filters.selectedPriceRange, filters.selectedColors, currency]);

  const handleCategoryChange = (category: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedCategory: prevFilters.selectedCategory.includes(category)
        ? prevFilters.selectedCategory.filter((c) => c !== category)
        : [...prevFilters.selectedCategory, category],
    }));
  };

  const handlePriceRangeChange = (priceRange: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedPriceRange: prevFilters.selectedPriceRange.includes(priceRange)
        ? prevFilters.selectedPriceRange.filter((r) => r !== priceRange)
        : [...prevFilters.selectedPriceRange, priceRange],
    }));
  };

  const handleColorChange = (color: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      selectedColors: prevFilters.selectedColors.includes(color)
        ? prevFilters.selectedColors.filter((c) => c !== color)
        : [...prevFilters.selectedColors, color],
    }));
  };

  const handleResetFilter = () => {
    setFilters({ selectedCategory: [], selectedPriceRange: [], selectedColors: [] });
  };

  const categories = useMemo(() => {
    return Array.from(new Set(productsData.map((product) => product.category)));
  }, []);

  return {
    products,
    loading,
    filters,
    handleCategoryChange,
    handlePriceRangeChange,
    handleColorChange,
    handleResetFilter,
    categories,
  };
};