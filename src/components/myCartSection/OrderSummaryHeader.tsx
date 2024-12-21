import React from "react";

interface OrderSummaryHeaderProps {
  theme: string;
  subtotal: number;
  deliveryCharge: number;
  isCouponApplied: boolean;
  discount: number;
  currency: "USD" | "INR";
}

const OrderSummaryHeader: React.FC<OrderSummaryHeaderProps> = ({
  theme,
  subtotal,
  deliveryCharge,
  isCouponApplied,
  discount,
  currency,
}) => {
  const formatCurrency = (amount: number): string => {
    return currency === "USD"
      ? `$${amount.toFixed(2)}`
      : `₹${amount.toFixed(2)}`;
  };

  return (
    <>
      <h2
        className={`text-lg font-bold mb-4 ${
          theme === "dark" ? "text-gray-200" : "text-gray-800"
        }`}
      >
        Order Summary
      </h2>
      <div className="flex justify-between mb-2">
        <p
          className={`font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Subtotal:
        </p>
        <p
          className={`font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {formatCurrency(subtotal)}
        </p>
      </div>
      <div className="flex justify-between mb-2">
        <p
          className={`font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Delivery:
        </p>
        <p
          className={`font-medium ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {formatCurrency(deliveryCharge)}
        </p>
      </div>
      {isCouponApplied && (
        <div
          className={`flex justify-between mb-2 font-medium ${
            theme === "dark" ? "text-green-400" : "text-green-600"
          }`}
        >
          <p>Discount (10% off):</p>
          <p>−{formatCurrency(discount)}</p>
        </div>
      )}
    </>
  );
};

export default OrderSummaryHeader;
