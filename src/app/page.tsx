"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import FilterProducts from "../components/productsSection/filters/FilterProducts";
import ProductCardSkeleton from "../components/productsSection/ProductCardSkeleton";
import ProductCard from "../components/productsSection/ProductCard";
import { useFilterProducts } from "../hooks/useFilterProducts";
import { usePageVirtualizedProducts } from "../hooks/usePageVirtualizedProducts";
import { selectCartSyncing } from "@/redux/cart/cartSlice";
import { selectWishlistSyncing } from "@/redux/wishlist/wishlistSlice";
import { showToast } from "@/config/ToastConfig";
import { timeout } from "@/utils/timeout";

const Index = () => {
  const productsGap = 8; // in px, matches the padding applied to ProductCard

  const isCartSyncing = useSelector(selectCartSyncing);
  const isWishlistSyncing = useSelector(selectWishlistSyncing);

  const {
    filteredProducts,
    productsFromApiRes,
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

  const prevFilteredLengthRef = useRef<number>(filteredProducts.length);
  const productCardRef = useRef<HTMLElement>(null);
  const [dynamicThreshold, setDynamicThreshold] = React.useState(300);
  const [cardHeight, setCardHeight] = React.useState(450); // Default fallback
  const [fakeLoading, setFakeLoading] = useState(false);

  // Calculate initial rows based on viewport height (before hook initialization)
  const getInitialRows = () => {
    if (typeof window === "undefined") return 2;

    const viewportHeight = window.innerHeight;
    const estimatedCardHeight = 450; // Estimated card height before measurement
    const rowsThatFitDecimal = viewportHeight / estimatedCardHeight;

    // If viewport can fit more than 2.3 rows, render 3 to ensure scrollability
    // This covers zoomed out cases where 2.5 rows are visible but need 3 to scroll
    return rowsThatFitDecimal > 2 ? 4 : 3;
  };

  const [initialRows] = React.useState(getInitialRows);

  // Custom page-level virtualization
  const {
    visibleItems,
    skeletonCount,
    isLoadingMore,
    hasLoadedAll,
    itemsPerRow,
  } = usePageVirtualizedProducts({
    items: filteredProducts,
    initialRows: initialRows,
    loadingDelay: 500,
    threshold: dynamicThreshold,
    rowHeight: cardHeight,
  });

  // Calculate dynamic threshold and card height based on measured card
  useEffect(() => {
    if (productCardRef.current) {
      const measuredHeight = productCardRef.current.offsetHeight;
      const threshold = measuredHeight + productsGap / 2;

      setDynamicThreshold(threshold);
      setCardHeight(measuredHeight);
    }
  }, [visibleItems.length, productsGap, initialRows]); // Recalculate when items change

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

  useEffect(() => {
    const timer = async () => {
      await timeout(400);
      setFakeLoading(false);
    };
    timer();
  }, [filterValues]);

  const filterProps = {
    categoryOptions,
    priceRangeOptions,
    colorOptions,
    sortOptions,
    filterValues,
    productsFromApiRes,
    onToggleCategory,
    onTogglePriceRange,
    onToggleColor,
    onSortByPrice,
    onResetFilters,
  };

  console.log("page rendered");

  return (
    <main className="main-content bg-background transition-colors duration-200">
      <div className="max-w-screen-3xl mx-auto pt-0">
        <div className="flex flex-col md:flex-row">
          <FilterProducts {...filterProps} />

          <section
            className="w-full product-card-wrapper grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-fit p-3"
            aria-label="Product catalog"
          >
            {isLoading || isCartSyncing || isWishlistSyncing || fakeLoading ? (
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
              <>
                {/* Render visible items */}
                {visibleItems.map((item, index) => (
                  <ProductCard
                    key={item.id}
                    ref={index === 0 ? productCardRef : undefined}
                    index={index}
                    item={item}
                    fetchImageWithTimeout={fetchImageWithTimeout}
                    itemsPerRow={itemsPerRow}
                    style={{ padding: productsGap }}
                    priority={index < itemsPerRow}
                  />
                ))}

                {/* Render skeleton loaders for the next row being loaded */}
                {skeletonCount > 0 &&
                  Array.from({ length: skeletonCount }).map((_, index) => (
                    <ProductCardSkeleton key={`skeleton-${index}`} />
                  ))}

                {/* Loading indicator */}
                {!hasLoadedAll && !isLoadingMore && visibleItems.length > 0 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-sm text-muted-foreground">
                      Scroll down to load more products ({visibleItems.length}{" "}
                      of {filteredProducts.length})
                    </p>
                  </div>
                )}

                {/* All loaded message */}
                {hasLoadedAll && filteredProducts.length > itemsPerRow * 2 && (
                  <div className="col-span-full text-center py-8">
                    <p className="text-sm text-muted-foreground">
                      All {filteredProducts.length} products loaded
                    </p>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Index;
