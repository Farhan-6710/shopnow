"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useFilterProducts } from "@/hooks/useFilterProducts";
import { usePageVirtualizedProducts } from "@/hooks/usePageVirtualizedProducts";
import { showToast } from "@/config/ToastConfig";
import { timeout } from "@/utils/timeout";
import { Product } from "@/types/product";
import ProductsGrid from "@/components/home/products-grid/ProductsGrid";
import ProductsLayout from "@/components/home/products-grid/ProductsLayout";
import ProductsFiltersPanel from "@/components/home/filters-panel/ProductsFiltersPanel";

const HomePage = () => {
  const productsGap = 8;

  const {
    products,
    isLoading: isProductsLoading,
    isFetching,
    error,
  } = useProductsQuery();

  const {
    filteredProducts,
    filterValues,
    onToggleCategory,
    onTogglePriceRange,
    onToggleColor,
    onSortByPrice,
    onResetFilters,
  } = useFilterProducts(products);

  const productCardRef = useRef<HTMLElement>(null);
  const prevFilteredLengthRef = useRef(filteredProducts.length);

  const [cardHeight, setCardHeight] = useState(450);
  const [dynamicThreshold, setDynamicThreshold] = useState(300);
  const [fakeLoading, setFakeLoading] = useState(false);

  const isLoading = isProductsLoading || isFetching || fakeLoading;

  const getInitialRows = () => {
    if (typeof window === "undefined") return 2;
    return window.innerHeight / 450 > 2 ? 4 : 3;
  };

  const [initialRows] = useState(getInitialRows);

  const {
    visibleItems,
    skeletonCount,
    isLoadingMore,
    hasLoadedAll,
    itemsPerRow,
  } = usePageVirtualizedProducts<Product>({
    items: filteredProducts,
    initialRows,
    loadingDelay: 500,
    threshold: dynamicThreshold,
    rowHeight: cardHeight,
  });

  useEffect(() => {
    if (productCardRef.current) {
      const height = productCardRef.current.offsetHeight;
      setCardHeight(height);
      setDynamicThreshold(height + productsGap / 2);
    }
  }, [visibleItems.length, productsGap, initialRows]);

  useEffect(() => {
    const isFilterApplied =
      filterValues.selectedCategories.length ||
      filterValues.selectedPriceRange.length ||
      filterValues.selectedColors.length;

    if (
      !isLoading &&
      isFilterApplied &&
      prevFilteredLengthRef.current !== filteredProducts.length
    ) {
      showToast({
        type: "success",
        title: "Filters Applied",
        description: `${filteredProducts.length} items matched your filters`,
      });
      prevFilteredLengthRef.current = filteredProducts.length;
    }
  }, [isLoading, filteredProducts.length, filterValues]);

  useEffect(() => {
    const run = async () => {
      setFakeLoading(true);
      await timeout(400);
      setFakeLoading(false);
    };
    run();
  }, [filterValues]);

  console.log("home page rendered")

  return (
    <ProductsLayout>
      <ProductsFiltersPanel
        filterValues={filterValues}
        products={products}
        onToggleCategory={onToggleCategory}
        onTogglePriceRange={onTogglePriceRange}
        onToggleColor={onToggleColor}
        onSortByPrice={onSortByPrice}
        onResetFilters={onResetFilters}
      />

      <ProductsGrid
        isLoading={isLoading}
        error={error}
        filteredProducts={filteredProducts}
        visibleItems={visibleItems}
        skeletonCount={skeletonCount}
        isLoadingMore={isLoadingMore}
        hasLoadedAll={hasLoadedAll}
        itemsPerRow={itemsPerRow}
        productCardRef={productCardRef}
        productsGap={productsGap}
      />
    </ProductsLayout>
  );
};

export default HomePage;
