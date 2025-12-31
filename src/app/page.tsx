"use client";

import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import FilterProducts from "../components/productsSection/filters/FilterProducts";
import ProductCardSkeleton from "../components/productsSection/ProductCardSkeleton";
import ProductCard from "../components/productsSection/ProductCard";
import { useFilterProducts } from "../hooks/useFilterProducts";
import { useEffect, useRef } from "react";
import { showToast } from "@/config/ToastConfig";

const Index = () => {
  const {
    filteredProducts,
    isLoading,
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
  } = useFilterProducts();
  
  console.log("component rendered");

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
        type: "success",
        title: "Filters Applied",
        description: `${filteredProducts.length} ${
          filteredProducts.length === 1 ? "item" : "items"
        } matched your filters`,
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
        <div className="grid md:grid-cols-[--spacing(60)_1fr] gap-3">
          <FilterProducts {...filterProps} />

          <section
            className="product-card-wrapper grid sm:grid-cols-2 md:pr-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-fit py-0 md:py-3"
            aria-label="Product catalog"
          >
            {isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <p className="text-lg font-semibold text-destructive">
                  Error loading products
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {error.message || "Please try again later"}
                </p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-lg font-semibold text-foreground">
                  No products found
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              filteredProducts.map((item, index) => (
                <ProductCard
                  key={item.id}
                  index={index}
                  item={item}
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
