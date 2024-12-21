"use client";

import { useState, useEffect } from "react";
import { productsData } from "@/src/data/productsData";
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import { RootState } from "@/src/store"; // Import RootState
import { addToCart, removeFromCart } from "@/src/features/cart/cartSlice"; // Import actions
import ProductCard from "./ProductCard";
import FilterProducts from "./FilterProducts"; // Import the new filter component
import { Product } from "@/types/product";

// Custom fetch function with timeout
const fetchImageWithTimeout = async (url: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error("Image fetch failed");
    return await response.blob();
  } catch (error) {
    console.error("Image fetch error:", error);
    return null; // Fallback or null image
  } finally {
    clearTimeout(timeoutId);
  }
};

// Define the FilterState type for your filters (e.g., category)
interface FilterState {
  selectedCategory: string;
}

const ProductSection = () => {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const cartItems = useSelector((state: RootState) => state.cart.cartItems); // Get cart items from Redux state
  const currency = useSelector((state: RootState) => state.cart.currency); // Get currency from Redux state

  // State for products and filters
  const [products, setProducts] = useState<Product[]>([]); // Store products
  const [filters, setFilters] = useState<FilterState>({ selectedCategory: "" }); // Store filter state

  // Get unique categories from products data (assuming products have a 'category' field)
  const categories = Array.from(
    new Set(productsData.map((product) => product.category))
  );

  // Update filtered products when selected category or productsData changes
  useEffect(() => {
    const filtered = filters.selectedCategory
      ? productsData.filter(
          (product) => product.category === filters.selectedCategory
        )
      : productsData;
    setProducts(filtered);
  }, [filters.selectedCategory]); // Trigger when selectedCategory changes

  // Handle add to cart
  const handleAddToCart = (productId: number) => {
    if (!cartItems.some((item) => item.id === productId)) {
      const product = productsData.find((product) => product.id === productId);
      if (product) {
        dispatch(addToCart({ ...product, quantity: 1, currency }));
      }
    }
  };

  // Handle remove from cart
  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  // Handle category filter change
  const handleCategoryChange = (category: string) => {
    setFilters({ selectedCategory: category }); // Update selected category in filter state
  };

  // Reset filter when unchecking all categories
  const handleResetFilter = () => {
    setFilters({ selectedCategory: "" }); // Reset the selected category to an empty string
  };

  return (
    <div className="bg-gray-100 dark:bg-primaryDark transition-colors duration-200">
      <div className="container mx-auto px-4 pt-6 pb-4">
        {/* Pass props to FilterProducts component */}
        <FilterProducts
          categories={categories}
          selectedCategory={filters.selectedCategory}
          handleCategoryChange={handleCategoryChange}
          handleResetFilter={handleResetFilter}
          filteredProductCount={products.length} // Pass filtered count to FilterProducts
        />

        {/* Products Grid */}
        <div className="flex flex-wrap -mx-4 product-card-wrapper pb-10">
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product.id}
                productName={product.productName}
                imgSource={product.imgSource} // Pass image URL
                prices={product.prices}
                rating={product.rating}
                addToCart={() => handleAddToCart(product.id)}
                removeFromCart={() => handleRemoveFromCart(product.id)}
                isInCart={cartItems.some((item) => item.id === product.id)}
                currency={currency}
                fetchImageWithTimeout={fetchImageWithTimeout} // Pass fetch function for custom image fetching
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
