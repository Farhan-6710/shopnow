"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectCurrency } from "@/redux/cart/cartSlice";
import { useCartCoupon } from "@/hooks/useCartCoupon";
import OrderSummary from "./OrderSummary";
import CartItemsContainer from "./CartItemsContainer";

const MyCartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const currency = useSelector(selectCurrency);

  const [isEmptyCart, setIsEmptyCart] = useState(cartItems.length === 0);

  // Use coupon hook for coupon logic
  const {
    couponCode,
    isCouponApplied,
    isInvalidCoupon,
    showCouponPlaceholder,
    handleCouponApply,
    handleInputChange,
    handleInputClick,
    getDiscount,
  } = useCartCoupon({ cartItemsCount: cartItems.length });

  // Define delivery charges based on currency
  const deliveryChargeUSD = 5.0;
  const deliveryChargeINR = 400.0;

  // Effect to update cart empty status
  useEffect(() => {
    setIsEmptyCart(cartItems.length === 0);
  }, [cartItems]);

  // Calculate totals based on currency
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.prices[currency] || 0) * item.quantity,
    0
  );
  const discount = getDiscount(subtotal);
  const deliveryCharge =
    currency === "USD" ? deliveryChargeUSD : deliveryChargeINR;
  const total = subtotal - discount + deliveryCharge;

  return (
    <section
      className="bg-background transition-colors duration-300"
      aria-labelledby="cart-heading"
    >
      <div className="container mx-auto px-4 lg:px-20 py-8">
        <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-4">
          <CartItemsContainer
            cartItems={cartItems}
            isEmptyCart={isEmptyCart}
            currency={currency}
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
            currency={currency}
            handleInputChange={handleInputChange}
            handleInputClick={handleInputClick}
            handleCouponApply={handleCouponApply}
          />
        </div>
      </div>
    </section>
  );
};

export default MyCartPage;
