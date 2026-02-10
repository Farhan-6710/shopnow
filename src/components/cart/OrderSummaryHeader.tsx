import { useTheme } from "next-themes";

interface OrderSummaryHeaderProps {
  subtotal: number;
  deliveryCharge: number;
  isCouponApplied: boolean;
  discount: number;
  currency: "USD" | "INR";
}

const OrderSummaryHeader = ({
  subtotal,
  deliveryCharge,
  isCouponApplied,
  discount,
  currency,
}: OrderSummaryHeaderProps) => {
  const formatCurrency = (amount: number): string => {
    return currency === "USD"
      ? `$${amount.toFixed(2)}`
      : `₹${amount.toFixed(2)}`;
  };

  const { theme } = useTheme();

  return (
    <>
      <h2 className="text-lg font-bold mb-4 dark:text-gray-200 text-gray-800">
        Order Summary
      </h2>
      <div className="flex justify-between mb-2">
        <p className="font-medium dark:text-gray-300 text-gray-700">
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
