"use client";

import { fetchImageWithTimeout } from "@/src/utils/fetchUtils";
import { useFilterProducts } from "@/src/hooks/useFilterProducts";
import { useFilterNotification } from "@/src/hooks/useFilterNotification";
import FilterNotification from "../components/productsSection/filters/FilterNotification";
import FilterProducts from "../components/productsSection/filters/FilterProducts";
import { FilterDrawer } from "../components/extras/FilterDrawer";
import ProductCardSkeleton from "../components/productsSection/ProductCardSkeleton";
import ProductCard from "../components/productsSection/ProductCard";

const Index = () => {
  const {
    filteredProducts,
    isLoading,
    filterValues,
    availableCategories,
    onToggleCategory,
    onTogglePriceRange,
    onToggleColor,
    onResetFilters,
    onSortByPrice,
  } = useFilterProducts();

  // Use the notification hook
  const { notificationMessage, setNotificationMessage } = useFilterNotification(
    {
      isLoading,
      productsLength: filteredProducts.length,
      isFilterApplied:
        filterValues.selectedCategories.length > 0 ||
        filterValues.selectedPriceRanges.length > 0 ||
        filterValues.selectedColors.length > 0,
    }
  );

  const filterProps = {
    availableCategories,
    filterValues,
    onToggleCategory,
    onTogglePriceRange,
    onToggleColor,
    onResetFilters,
    onSortByPrice,
  };

  return (
    <div className="bg-gray-50 dark:bg-primaryDark transition-colors duration-200">
      <div className="max-w-screen-3xl mx-auto pt-0">
        <div className="grid md:grid-cols-[theme(spacing.72)_1fr] gap-4">
          <FilterProducts {...filterProps} />

          <div className="product-card-wrapper grid md:grid-cols-2 md:pr-4 lg:grid-cols-3 xl:grid-cols-4 h-fit py-0 md:py-4">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  fetchImageWithTimeout={fetchImageWithTimeout}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {/* Notification Popup */}
      {notificationMessage && (
        <FilterNotification
          message={notificationMessage}
          onClose={() => setNotificationMessage(null)}
        />
      )}
    </div>
  );
};

export default Index;
