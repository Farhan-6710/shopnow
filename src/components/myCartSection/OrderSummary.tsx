import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import OrderSummaryHeader from "./OrderSummaryHeader";
import CouponSection from "./CouponSection";
import PaymentMethods from "./PaymentMethods";

interface OrderSummaryProps {
  isEmptyCart: boolean;
  isCouponApplied: boolean;
  showCouponPlaceholder: boolean;
  isInvalidCoupon: boolean;
  couponCode: string;
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  currency: "USD" | "INR";
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputClick: () => void;
  handleCouponApply: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  isEmptyCart,
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
}) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [inputClass, setInputClass] = useState("");

  useEffect(() => {
    setInputClass(theme === "dark" ? "placeholder-white" : "");
  }, [theme]);

  const formatCurrency = (amount: number): string => {
    return currency === "USD"
      ? `$${amount.toFixed(2)}`
      : `₹${amount.toFixed(2)}`;
  };

  return (
    !isEmptyCart && (
      <div
        className={`w-full md:w-4/12 border border-gray-300 dark:border-gray-700 p-4 rounded ${
          theme === "dark" ? "bg-gray-800 shadow-sm" : "bg-white shadow-sm"
        } h-fit`}
      >
        <OrderSummaryHeader
          theme={theme}
          subtotal={subtotal}
          deliveryCharge={deliveryCharge}
          isCouponApplied={isCouponApplied}
          discount={discount}
          currency={currency}
        />
        <CouponSection
          isEmptyCart={isEmptyCart}
          isCouponApplied={isCouponApplied}
          showCouponPlaceholder={showCouponPlaceholder}
          isInvalidCoupon={isInvalidCoupon}
          couponCode={couponCode}
          handleInputChange={handleInputChange}
          handleInputClick={handleInputClick}
          handleCouponApply={handleCouponApply}
          inputClass={inputClass}
          theme={theme}
          total={total}
          formatCurrency={formatCurrency}
        />
        <PaymentMethods />
      </div>
    )
  );
};

export default OrderSummary;
