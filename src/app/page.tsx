"use client";

import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import FilterProducts from "../components/productsSection/filters/FilterProducts";
import ProductCardSkeleton from "../components/productsSection/ProductCardSkeleton";
import ProductCard from "../components/productsSection/ProductCard";
import { useFilterProducts } from "../hooks/useFilterProducts";
import { useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import { showToast } from "@/config/ToastConfig";

const Index = () => {
  const {
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
  } = useFilterProducts();

  const prevFilteredLengthRef = useRef<number>(filteredProducts.length);

  useEffect(() => {
    const isFilterApplied =
      filterValues.selectedCategories.length > 0 ||
      filterValues.selectedPriceRange.length > 0 ||
      filterValues.selectedColors.length > 0;

    if (
      !isLoading &&
      isFilterApplied &&
      prevFilteredLengthRef.current !== filteredProducts.length
    ) {
      showToast({
        type: "custom",
        title: "Filters Applied",
        description: `${filteredProducts.length} ${
          filteredProducts.length === 1 ? "item" : "items"
        } matched your filters`,
        icon: Filter,
      });
      prevFilteredLengthRef.current = filteredProducts.length;
    }
  }, [isLoading, filteredProducts.length, filterValues]);

  const filterProps = {
    categoryOptions,
    priceRangeOptions,
    colorOptions,
    sortOptions,
    filterValues,
    onToggleCategory,
    onTogglePriceRange,
    onToggleColor,
    onSortByPrice,
    onResetFilters,
  };

  return (
    <main className="bg-background transition-colors duration-200">
      <div className="max-w-screen-3xl mx-auto pt-0">
        <div className="grid md:grid-cols-[theme(spacing.72)_1fr] gap-4">
          <FilterProducts {...filterProps} />

          <section
            className="product-card-wrapper grid md:grid-cols-2 md:pr-4 lg:grid-cols-3 xl:grid-cols-4 h-fit py-0 md:py-4"
            aria-label="Product catalog"
          >
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : filteredProducts.length === 0 ? (
              <p role="status" aria-live="polite">
                No products found
              </p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  fetchImageWithTimeout={fetchImageWithTimeout}
                />
              ))
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Index;
