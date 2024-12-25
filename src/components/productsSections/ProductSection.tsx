"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import ProductCard from "./ProductCard";
import FilterProducts from "./FilterProducts";
import ProductCardSkeleton from "./ProductCardSkeleton";
import FilterNotification from "./FilterNotification";
import { FilterDrawer } from "../extras/FilterDrawer";
import { useProductFilters } from "@/utils/useProductFilters";
import { useFilterNotification } from "@/utils/useFilterNotification"; // Import useFilterNotification
import { useCartActions } from "@/utils/useCartActions"; // Import useCartActions

const ProductSection = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currency = useSelector((state: RootState) => state.cart.currency);

  const {
    products,
    loading,
    filters,
    handleCategoryChange,
    handlePriceRangeChange,
    handleColorChange,
    handleResetFilter,
    categories,
  } = useProductFilters();

  // Use the notification hook
  const { notificationMessage, setNotificationMessage } = useFilterNotification(
    {
      loading,
      productsLength: products.length,
      filtersApplied:
        filters.selectedCategory.length > 0 ||
        filters.selectedPriceRange.length > 0 ||
        filters.selectedColors.length > 0,
    }
  );

  const { handleAddToCart, handleRemoveFromCart } = useCartActions();

  return (
    <div className="bg-gray-50 dark:bg-primaryDark transition-colors duration-200">
      <div className="max-w-screen-3xl mx-auto pt-0">
        <div className="grid md:grid-cols-[theme(spacing.72)_1fr] gap-4">
          <div className="flex flex-col sticky-filter-sidebar border-r border-gray-300 dark:border-gray-700 p-6 pb-0 md:pb-6 2xl:pt-10">
            <div className="hidden md:block">
              <FilterProducts
                categories={categories}
                selectedCategory={filters.selectedCategory}
                selectedPriceRange={filters.selectedPriceRange}
                selectedColors={filters.selectedColors}
                handleCategoryChange={handleCategoryChange}
                handlePriceRangeChange={handlePriceRangeChange}
                handleColorChange={handleColorChange}
                handleResetFilter={handleResetFilter}
                filteredProductCount={products.length}
              />
            </div>
            <div className="block md:hidden">
              <FilterDrawer
                categories={categories}
                selectedCategory={filters.selectedCategory}
                selectedPriceRange={filters.selectedPriceRange}
                selectedColors={filters.selectedColors}
                handleCategoryChange={handleCategoryChange}
                handlePriceRangeChange={handlePriceRangeChange}
                handleColorChange={handleColorChange}
                handleResetFilter={handleResetFilter}
                filteredProductCount={products.length}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:pr-4 lg:grid-cols-3 xl:grid-cols-4 product-card-wrapper h-fit py-0 md:py-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : products.length === 0 ? (
              <p>No products found</p>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  productName={product.productName}
                  imgSource={product.imgSource}
                  prices={product.prices}
                  rating={product.rating}
                  addToCart={() => handleAddToCart(product.id)}
                  removeFromCart={() => handleRemoveFromCart(product.id)}
                  isInCart={cartItems.some((item) => item.id === product.id)}
                  currency={currency}
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

export default ProductSection;
