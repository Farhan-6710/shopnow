"use client"; // Ensures this component is rendered on the client side

import React, { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import ProductActions from "./ProductActions";
import Rating from "./Rating";
import { Button } from "../ui/button";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/cart/cartSlice";
import { showToast } from "@/config/ToastConfig";
import { RootState } from "@/redux/store";
import { Product } from "@/types/product";

interface ProductDetailsCardProps {
  product: Product;
  isHighlighted?: boolean;
  currency: "USD" | "INR";
  fetchImageWithTimeout: (url: string) => Promise<Blob | null>;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({
  product,
  currency,
  fetchImageWithTimeout,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const isInCart = cartItems.some((item) => item.id === product.id);
  const [isInCartState, setIsInCartState] = useState(isInCart);

  // Synchronize component state with props
  useEffect(() => {
    setIsInCartState(isInCart);
  }, [isInCart]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    showToast({
      type: "custom",
      title: "Added to Cart",
      description: `${product.productName} has been added to your cart`,
      icon: ShoppingCart,
    });
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
    showToast({
      type: "custom",
      title: "Item Removed",
      description: `${product.productName} removed from cart`,
      icon: Trash2,
    });
  };

  // Display price based on selected currency
  const displayPrice = (currency: "USD" | "INR") => {
    const price = product.prices[currency];
    if (typeof price !== "number" || isNaN(price)) {
      return "0.00"; // Fallback value in case of invalid price
    }
    return price.toFixed(2); // Return price formatted to two decimal places
  };

  return (
    <div className="px-4 md:px-2 p-2 w-full flex flex-col md:flex-row h-full">
      <div className="product-card transition-all duration-200 bg-card border w-full">
        <div className="flex flex-col md:flex-row justify-center items-center text-center md:text-left h-full pt-4 pb-8 overflow-hidden transition-all duration-300 dark:border-slate-700 border-gray-200">
          {/* Product Image on the Left */}
          <div className="w-full md:w-1/3 md:mb-4 flex justify-center">
            <ProductImage
              imgSource={product.imgSource}
              alt={product.productName}
              fetchImageWithTimeout={fetchImageWithTimeout}
            />
          </div>

          {/* Product Info and Actions on the Right */}
          <div className="w-full md:w-2/3 flex flex-col justify-between items-start p-4 pt-0 md:pt-4 md:pr-10">
            <h2 className="text-lg 2xl:text-lg font-bold dark:text-white text-primaryDarkTwo">
              {product.productName}
            </h2>
            <p className="text-sm text-start text-gray-600 dark:text-gray-300 mt-4">
              {product.description}
            </p>
            <div className="flex flex-col justify-center items-start mt-4">
              <p className="text-3xl font-bold dark:text-gray-300 text-gray-700 mb-2">
                {currency === "INR" ? "₹" : "$"}
                {displayPrice(currency)}
              </p>
              <Rating rating={product.rating ?? 0} totalStars={5} />
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-2 w-full">
              <ProductActions
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
                productName={product.productName}
                isInCart={isInCartState}
              />
              <Link href="/" className="ml-auto">
                <Button variant="outline">Back To Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
