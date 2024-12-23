"use client";

import React from "react";
import ProductCard from "@/src/components/productsSections/ProductCard";
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import { RootState } from "@/src/store"; // Import RootState
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from "@/src/features/cart/cartSlice";
import { Product } from "@/types/product"; // Import Product type
import { fetchImageWithTimeout } from "@/utils/fetchUtils"; // Import the fetchImageWithTimeout function

interface ProductPageClientProps {
  id: number;
  productName: string;
  imgSource: string;
  prices: {
    USD: number;
    INR: number;
  };
  rating?: number;
  currency: "USD" | "INR";
}

const ProductPageClient: React.FC<ProductPageClientProps> = ({
  id,
  productName,
  imgSource,
  prices,
  rating = 0,
  currency,
}) => {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const cartItems = useSelector((state: RootState) => state.cart.cartItems); // Get cart items from Redux state

  // Construct the product object with type Product
  const product: Product = {
    id,
    productName,
    imgSource,
    prices,
    rating,
  };

  // Check if the product is in the cart based on the product ID
  const isInCart = cartItems.some((item) => item.id === product.id);

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        productName: product.productName,
        imgSource: product.imgSource,
        prices: product.prices,
        rating: product.rating,
        quantity: 1, // Default quantity
        currency,
      })
    );
  };

  // Handle removing the product from the cart
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <ProductCard
      key={product.id}
      productName={product.productName}
      imgSource={product.imgSource}
      prices={product.prices}
      rating={product.rating}
      addToCart={handleAddToCart}
      removeFromCart={handleRemoveFromCart}
      isInCart={isInCart}
      currency={currency}
      fetchImageWithTimeout={fetchImageWithTimeout} // Pass fetch function for custom image fetching
    />
  );
};

export default ProductPageClient;
