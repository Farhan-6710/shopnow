import React from "react";
import OrderSummaryHeader from "./OrderSummaryHeader";
import Coupon from "./Coupon";
import PaymentMethods from "./PaymentMethods";
import { useTheme } from "next-themes";

interface OrderSummaryProps {
  isCouponApplied: boolean;
  showCouponPlaceholder: boolean;
  isInvalidCoupon: boolean;
  couponCode: string;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  currency: "USD" | "INR";
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | null>) => void;
  handleInputClick: () => void;
  handleCouponApply: () => void;
}

import { motion } from "framer-motion";

const OrderSummary = ({
  isCouponApplied,
  showCouponPlaceholder,
  isInvalidCoupon,
  couponCode,
  subtotal,
  deliveryCharge,
  discount,
  total,
  currency,
  handleInputChange,
  handleInputClick,
  handleCouponApply,
}: OrderSummaryProps) => {
  const { theme } = useTheme();

  const inputClass = theme === "dark" ? "placeholder-white" : "";

  const formatCurrency = (amount: number): string => {
    return currency === "USD"
      ? `$${amount.toFixed(2)}`
      : `₹${amount.toFixed(2)}`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
      className={`w-full lg:w-4/12 border p-4 rounded ${
        theme === "dark" ? "bg-card shadow-sm" : "bg-white shadow-sm"
      } h-fit`}
      aria-labelledby="order-summary-heading"
    >
      <h2 id="order-summary-heading" className="sr-only">
        Order Summary
      </h2>
      <OrderSummaryHeader
        subtotal={subtotal}
        deliveryCharge={deliveryCharge}
        isCouponApplied={isCouponApplied}
        discount={discount}
        currency={currency}
      />
      <Coupon
        isCouponApplied={isCouponApplied}
        showCouponPlaceholder={showCouponPlaceholder}
        isInvalidCoupon={isInvalidCoupon}
        couponCode={couponCode}
        handleInputChange={handleInputChange}
        handleInputClick={handleInputClick}
        handleCouponApply={handleCouponApply}
        inputClass={inputClass}
        total={total}
        formatCurrency={formatCurrency}
      />
      <PaymentMethods />
    </motion.section>
  );
};

export default OrderSummary;
