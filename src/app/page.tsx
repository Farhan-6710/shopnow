"use client";

import { useEffect } from "react";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { useFilterProducts } from "@/hooks/useFilterProducts";
import { showToast } from "@/config/ToastConfig";
import ProductsLayout from "@/components/home/products-grid/ProductsLayout";
import ProductsFiltersPanel from "@/components/home/filters-panel/ProductsFiltersPanel";
import ProductsGrid from "@/components/home/products-grid/ProductsGrid";

const HomePage = () => {
  const { products, isLoading, isFetching, error } = useProductsQuery();

  const {
    filteredProducts,
    filterValues,
    onToggleCategory,
    onTogglePriceRange,
    onToggleColor,
    onSortByPrice,
    onResetFilters,
  } = useFilterProducts(products);

  useEffect(() => {
    const isFilterApplied =
      filterValues.selectedCategories.length > 0 ||
      filterValues.selectedPriceRange.length > 0 ||
      filterValues.selectedColors.length > 0 ||
      filterValues.selectedSort;

    if (isFilterApplied) {
      showToast({
        type: "success",
        title: "Filters Applied",
        description: `${filteredProducts.length} items matched your filters`,
      });
    }
  }, [filterValues, filteredProducts.length]);

  return (
    <ProductsLayout>
      <ProductsFiltersPanel
        products={products || []}
        filterValues={filterValues}
        onToggleCategory={onToggleCategory}
        onTogglePriceRange={onTogglePriceRange}
        onToggleColor={onToggleColor}
        onSortByPrice={onSortByPrice}
        onResetFilters={onResetFilters}
      />

      <ProductsGrid
        products={filteredProducts}
        isLoading={isLoading || isFetching}
        error={error}
      />
    </ProductsLayout>
  );
};

export default HomePage;
