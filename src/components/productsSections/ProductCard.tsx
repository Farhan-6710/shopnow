"use client"; // Ensures this component is rendered on the client side

import React, { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductActions from "./ProductActions";
import { useTheme } from "next-themes";
import Link from "next/link";

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
    <div className="px-4 md:px-2 p-2 w-full flex flex-col h-full">
      <div className="transition-all duration-200 dark:bg-gray-900 border-gray-200">
        <div
          className={`product-card border text-center h-full pt-4 pb-8 overflow-hidden transition-all duration-300 ${
            theme === "dark"
              ? "bg-gray-900 shadow-for-dark border-for-dark"
              : "bg-white shadow-for-light border-gray-200"
          }`}
        >
          <Link
            href={`/products/${productName}`} // Navigate to /products/[productName]
            passHref
            className="flex flex-col justify-center items-center "
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
            />
          </Link>
          <div className="mt-4">
            <ProductActions
              isInCartState={isInCartState}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              productName={productName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
