"use client";

import { useState, useEffect } from "react";
import { productsData } from "@/src/data/productsData";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store";
import { addToCart, removeFromCart } from "@/src/features/cart/cartSlice";
import ProductCard from "./ProductCard";
import FilterProducts from "./FilterProducts";
import ProductCardSkeleton from "./ProductCardSkeleton"; // Import the skeleton component
import { Product } from "@/types/product";
import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import FilterNotification from "./FilterNotification";

interface FilterState {
  selectedCategory: string[];
  selectedPriceRange: string[];
  selectedColors: string[];
}

const ProductSection = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currency = useSelector((state: RootState) => state.cart.currency);

  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    selectedCategory: [],
    selectedPriceRange: [],
    selectedColors: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [notificationMessage, setNotificationMessage] = useState<string | null>(
    null
  );

  const categories = Array.from(
    new Set(productsData.map((product) => product.category))
  );

  const priceRanges = {
    cheap: { USD: 20, INR: 500 },
    affordable: { USD: 39, INR: 2500 },
    expensive: { USD: 39, INR: 2500 },
  };

  // Utility function to check if any filter is applied
  const areFiltersApplied = () => {
    return (
      filters.selectedCategory.length > 0 ||
      filters.selectedPriceRange.length > 0 ||
      filters.selectedColors.length > 0
    );
  };

  // Update filtered products when selected category, price range, color, or productsData changes
  useEffect(() => {
    const filtered = productsData.filter((product) => {
      const matchesCategory =
        filters.selectedCategory.length === 0 ||
        filters.selectedCategory.includes(product.category);

      const productPrice = product.prices[currency] || product.prices.USD;

      let matchesPrice = true;
      if (filters.selectedPriceRange.length > 0) {
        matchesPrice = filters.selectedPriceRange.some((range) => {
          if (range === "cheap") {
            return productPrice <= priceRanges.cheap[currency];
          } else if (range === "affordable") {
            return (
              productPrice > priceRanges.cheap[currency] &&
              productPrice <= priceRanges.affordable[currency]
            );
          } else if (range === "expensive") {
            return productPrice > priceRanges.affordable[currency];
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
  }, [
    filters.selectedCategory,
    filters.selectedPriceRange,
    filters.selectedColors,
    currency,
  ]);

  // Trigger notification once products are filtered and loaded, and filters are applied
  useEffect(() => {
    if (!loading && areFiltersApplied()) {
      triggerNotification(`${products.length} items matched your filters.`);
    }
  }, [loading, products.length]);

  // Function to handle filter changes and show notification
  const triggerNotification = (message: string) => {
    setNotificationMessage(message);
  };

  const handleAddToCart = (productId: number) => {
    if (!cartItems.some((item) => item.id === productId)) {
      const product = productsData.find((product) => product.id === productId);
      if (product) {
        dispatch(addToCart({ ...product, quantity: 1, currency }));
      }
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prevFilters) => {
      const updatedCategory = prevFilters.selectedCategory.includes(category)
        ? prevFilters.selectedCategory.filter((c) => c !== category) // Remove category if already selected
        : [...prevFilters.selectedCategory, category]; // Add category if not selected
      return { ...prevFilters, selectedCategory: updatedCategory };
    });
  };

  const handlePriceRangeChange = (priceRange: string) => {
    setFilters((prevFilters) => {
      const updatedPriceRange = prevFilters.selectedPriceRange.includes(
        priceRange
      )
        ? prevFilters.selectedPriceRange.filter((r) => r !== priceRange) // Remove price range if already selected
        : [...prevFilters.selectedPriceRange, priceRange]; // Add price range if not selected
      return { ...prevFilters, selectedPriceRange: updatedPriceRange };
    });
  };

  const handleColorChange = (color: string) => {
    setFilters((prevFilters) => {
      const updatedColors = prevFilters.selectedColors.includes(color)
        ? prevFilters.selectedColors.filter((c) => c !== color) // Remove color if already selected
        : [...prevFilters.selectedColors, color]; // Add color if not selected
      return { ...prevFilters, selectedColors: updatedColors };
    });
  };

  const handleResetFilter = () => {
    setFilters({
      selectedCategory: [],
      selectedPriceRange: [],
      selectedColors: [],
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-primaryDark transition-colors duration-200">
      <div className="max-w-screen-3xl mx-auto pt-0">
        <div className="grid md:grid-cols-[theme(spacing.72)_1fr] gap-4">
          <div className="flex flex-col sticky-filter-sidebar border-r border-gray-300 dark:border-gray-700 p-6 2xl:pt-10">
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

          <div className="grid md:grid-cols-2 md:pr-4 lg:grid-cols-3 xl:grid-cols-4 product-card-wrapper h-fit py-4">
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
