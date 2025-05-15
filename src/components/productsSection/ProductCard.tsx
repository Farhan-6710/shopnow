"use client"; // Ensures this component is rendered on the client side

import React, { useState } from "react";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import ProductActions from "./ProductActions";
import { useTheme } from "next-themes";
import Link from "next/link";
import { Product } from "@/types/product";
import { useCartActions } from "@/utils/useCartActions";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";

interface ProductCardProps {
  product: Product;
  fetchImageWithTimeout: (url: string) => Promise<any>;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  fetchImageWithTimeout,
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currency = useSelector((state: RootState) => state.cart.currency);
  const isInCart = cartItems.some((item) => item.id === product.id); // Check if the product is in the cart

  const { handleAddToCart: addToCart, handleRemoveFromCart: removeFromCart } =
    useCartActions();

  const handleAddToCart = () => {
    if (addToCart && !isInCart) {
      addToCart(product.id); // Pass product ID to addToCart
    }
  };

  const handleRemoveFromCart = () => {
    if (removeFromCart && isInCart) {
      removeFromCart(product.id); // Pass product ID to removeFromCart
    }
  };

  // Display price based on selected currency
  const displayPrice = (currency: "USD" | "INR") => {
    const price = product.prices[currency];
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
            href={`/products/${product.productName}`} // Navigate to /products/[productName]
            passHref
            className="flex flex-col justify-center items-center "
          >
            <ProductImage
              imgSource={product.imgSource}
              alt={product.productName}
              fetchImageWithTimeout={fetchImageWithTimeout}
            />
            <ProductDetails
              productName={product.productName}
              currency={currency}
              displayPrice={displayPrice}
              rating={product.rating ?? 0} // Fallback to 0 if rating is undefined
            />
          </Link>
          <div className="mt-4">
            <ProductActions
              productName={product.productName}
              handleAddToCart={handleAddToCart}
              handleRemoveFromCart={handleRemoveFromCart}
              isInCart={isInCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
