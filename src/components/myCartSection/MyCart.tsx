"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  selectCurrency,
  replaceCart,
  selectCartItems,
} from "@/redux/cart/cartSlice";
import { useCartCoupon } from "@/hooks/useCartCoupon";
import CartHeader from "./CartHeader";
import CartEmpty from "./CartEmpty";
import CartItemList from "./CartItemList";
import OrderSummary from "./OrderSummary";

const MyCart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector(selectCartItems);
  const currency = useSelector(selectCurrency);
  const isEmpty = cartItems.length === 0;

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

  // Calculate totals based on currency
  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.prices[currency] || 0) * item.quantity,
    0
  );
  const discount = getDiscount(subtotal);
  const deliveryCharge =
    currency === "USD" ? deliveryChargeUSD : deliveryChargeINR;
  const total = subtotal - discount + deliveryCharge;

  const handleClearCart = () => {
    dispatch(
      replaceCart({ cartItems: {}, currency, loading: false, error: null })
    );
  };

  return (
    <section
      className="bg-background transition-colors duration-300 min-h-[60vh]"
      aria-labelledby="cart-heading"
    >
      <div className="container mx-auto px-4 lg:px-20 py-8">
        <CartHeader
          itemCount={cartItems.length}
          onClearCart={handleClearCart}
          isEmpty={isEmpty}
        />

        {isEmpty ? (
          <CartEmpty />
        ) : (
          <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-4">
            <div className="w-full md:w-8/12 bg-card h-fit">
              <CartItemList cartItems={cartItems} currency={currency} />
            </div>
            <OrderSummary
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
        )}
      </div>
    </section>
  );
};

export default MyCart;
