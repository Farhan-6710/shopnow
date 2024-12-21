"use client"; // Ensures this component is rendered on the client side

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store"; // Import RootState type
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductActions from "./ProductActions";

interface ProductCardProps {
  productName: string;
  imgSource: string;
  prices: {
    USD: number;
    INR: number;
  };
  rating?: number;
  addToCart?: () => void;
  removeFromCart?: () => void;
  isInCart?: boolean;
  isHighlighted?: boolean;
  currency: "USD" | "INR"; // Currency prop to determine which price to display
  fetchImageWithTimeout: (url: string) => Promise<any>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  productName,
  imgSource,
  prices,
  rating = 0,
  addToCart,
  removeFromCart,
  isInCart = false,
  currency,
  fetchImageWithTimeout,
}) => {
  const theme = useSelector((state: RootState) => state.theme.theme); // Get the current theme from Redux
  const [isInCartState, setIsInCartState] = useState(isInCart);

  // Synchronize component state with props
  useEffect(() => {
    setIsInCartState(isInCart);
  }, [isInCart]);

  const handleAddToCart = () => {
    if (addToCart && !isInCartState) {
      addToCart();
      setIsInCartState(true); // Update local state
    }
  };

  const handleRemoveFromCart = () => {
    if (removeFromCart && isInCartState) {
      removeFromCart();
      setIsInCartState(false); // Update local state
    }
  };

  // Display price based on selected currency
  const displayPrice = (currency: "USD" | "INR") => {
    const price = prices[currency];
    if (typeof price !== "number" || isNaN(price)) {
      return "0.00"; // Fallback value in case of invalid price
    }
    return price.toFixed(2); // Return price formatted to two decimal places
  };

  // Determine if dark mode is active
  const isDarkMode = theme === "dark";

  return (
    <div
      className="p-4 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col h-full pb-4"
    >
      <div
        className={`product-card transition-all duration-200 ${
          isDarkMode
            ? "bg-gray-900 shadow-for-dark border-for-dark"
            : "bg-white shadow-for-light border-gray-200"
        }`}
      >
        <div
          className={`border flex flex-col justify-center items-center text-center h-full pt-4 pb-8 overflow-hidden ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <ProductImage
            imgSource={imgSource}
            alt={productName}
            fetchImageWithTimeout={fetchImageWithTimeout}
          />
          <ProductDetails
            productName={productName}
            currency={currency}
            displayPrice={displayPrice}
            rating={rating}
            isDarkMode={isDarkMode}
          />
          <ProductActions
            isInCartState={isInCartState}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            isDarkMode={isDarkMode}
            productName={productName}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
