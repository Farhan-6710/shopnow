"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store"; // Import RootState
import {
  updateQuantity,
  removeFromCart,
  selectCurrency,
  selectCartItems,
} from "@/src/features/cart/cartSlice"; // Import actions and selectors
import OrderSummary from "./OrderSummary";
import CartItemsContainer from "./CartItemsContainer";

const MyCartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currency = useSelector(selectCurrency);

  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isInvalidCoupon, setIsInvalidCoupon] = useState(false);
  const [isEmptyCart, setIsEmptyCart] = useState(cartItems.length === 0);
  const [showCouponPlaceholder, setShowCouponPlaceholder] = useState(false);

  // Define delivery charges based on currency
  const deliveryChargeUSD = 5.0;
  const deliveryChargeINR = 400.0;

  // Effect to update cart empty status
  useEffect(() => {
    setIsEmptyCart(cartItems.length === 0);
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  // Handle coupon application
  const handleCouponApply = () => {
    if (cartItems.length === 0) {
      setIsEmptyCart(true);
      setIsInvalidCoupon(false);
      setShowCouponPlaceholder(false);
      return;
    }

    if (couponCode.trim() === "") {
      setIsInvalidCoupon(false);
      setIsEmptyCart(false);
      setShowCouponPlaceholder(true);
      return;
    }

    if (couponCode === "SHOPNOW10") {
      setIsCouponApplied(true);
      setIsInvalidCoupon(false);
      setIsEmptyCart(false);
      setShowCouponPlaceholder(false);
    } else {
      setIsInvalidCoupon(true);
      setCouponCode("");
      setIsEmptyCart(false);
      setShowCouponPlaceholder(false);
    }
  };

  // Handle input click for coupon code
  const handleInputClick = () => {
    if (isInvalidCoupon || isEmptyCart || showCouponPlaceholder) {
      setIsInvalidCoupon(false);
      setIsEmptyCart(false);
      setShowCouponPlaceholder(false);
      setCouponCode("");
    }
  };

  // Calculate totals based on currency
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.prices[currency] || 0) * item.quantity,
    0
  );
  const discount = isCouponApplied ? 0.1 * subtotal : 0;
  const deliveryCharge =
    currency === "USD" ? deliveryChargeUSD : deliveryChargeINR;
  const total = subtotal - discount + deliveryCharge;

  return (
    <div className="bg-gray-100 dark:bg-primaryDark transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-4">
          <CartItemsContainer
            cartItems={cartItems}
            handleQuantityChange={handleQuantityChange}
            removeFromCart={(id: number) => dispatch(removeFromCart(id))}
            isEmptyCart={isEmptyCart}
            currency={currency} // Pass currency to CartItemsContainer
          />
          <OrderSummary
            isEmptyCart={isEmptyCart}
            isCouponApplied={isCouponApplied}
            showCouponPlaceholder={showCouponPlaceholder}
            isInvalidCoupon={isInvalidCoupon}
            couponCode={couponCode}
            subtotal={subtotal}
            deliveryCharge={deliveryCharge}
            discount={discount}
            total={total}
            currency={currency} // Pass currency to OrderSummary
            handleInputChange={(e) => setCouponCode(e.target.value)}
            handleInputClick={handleInputClick}
            handleCouponApply={handleCouponApply}
          />
        </div>
      </div>
    </div>
  );
};

export default MyCartPage;
