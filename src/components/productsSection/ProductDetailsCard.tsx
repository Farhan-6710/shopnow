"use client"; // Ensures this component is rendered on the client side

import React, { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import ProductActions from "./ProductActions";
import { useTheme } from "next-themes";
import Rating from "./Rating";
import { Button } from "../ui/button";
import Link from "next/link";

interface ProductDetailsCardProps {
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
  currency: "USD" | "INR";
  fetchImageWithTimeout: (url: string) => Promise<any>;
  description: string;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({
  productName,
  imgSource,
  prices,
  rating = 0,
  addToCart,
  removeFromCart,
  isInCart = false,
  currency,
  fetchImageWithTimeout,
  description,
}) => {
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

  const { theme } = useTheme();

  return (
    <div className="px-4 md:px-2 p-2 w-full flex flex-col md:flex-row h-full">
      <div className="product-card transition-all duration-200 dark:bg-gray-900 bg-white border-gray-200 w-full">
        <div className="border flex flex-col md:flex-row justify-center items-center text-center md:text-left h-full pt-4 pb-8 overflow-hidden transition-all duration-300 dark:border-slate-700 border-gray-200">
          {/* Product Image on the Left */}
          <div className="w-full md:w-1/3 md:mb-4 flex justify-center">
            <ProductImage
              imgSource={imgSource}
              alt={productName}
              fetchImageWithTimeout={fetchImageWithTimeout}
            />
          </div>

          {/* Product Info and Actions on the Right */}
          <div className="w-full md:w-2/3 flex flex-col justify-between items-start p-4 pt-0 md:pt-4 md:pr-10">
            <h2 className="text-lg 2xl:text-lg font-bold dark:text-white text-gray-900">
              {productName}
            </h2>
            <p className="text-sm text-start text-gray-600 dark:text-gray-300 mt-4">
              {description}
            </p>
            <div className="flex flex-col justify-center items-start flex-grow mt-4">
              <p className="text-3xl font-bold dark:text-gray-300 text-gray-700 mb-2">
                {currency === "INR" ? "₹" : "$"}
                {displayPrice(currency)}
              </p>
              <Rating rating={rating} totalStars={5} />
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-2">
              <ProductActions
                isInCartState={isInCartState}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                productName={productName}
              />
              <Link href="/">
                <button className="bg-white dark:bg-gray-900 py-2 rounded-sm px-6 border border-gray-200 dark:border-slate-700">
                  Back To Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
