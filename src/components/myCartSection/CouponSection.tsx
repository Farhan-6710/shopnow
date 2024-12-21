import React from "react";

interface CouponSectionProps {
  isEmptyCart: boolean;
  isCouponApplied: boolean;
  showCouponPlaceholder: boolean;
  isInvalidCoupon: boolean;
  couponCode: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputClick: () => void;
  handleCouponApply: () => void;
  inputClass: string;
  theme: string;
  total: number; // Add total prop
  formatCurrency: (amount: number) => string; // Add formatCurrency function prop
}

const CouponSection: React.FC<CouponSectionProps> = ({
  isEmptyCart,
  isCouponApplied,
  showCouponPlaceholder,
  isInvalidCoupon,
  couponCode,
  handleInputChange,
  handleInputClick,
  handleCouponApply,
  inputClass,
  theme,
  total,
  formatCurrency,
}) => {
  return (
    <>
      {!isCouponApplied && (
        <>
          <input
            type="text"
            id="coupon-code-input"
            placeholder={
              isEmptyCart
                ? "Kindly Add Items In Cart First"
                : showCouponPlaceholder
                ? "Enter Coupon Code"
                : isInvalidCoupon
                ? "Coupon Not Found"
                : "Enter Coupon Code"
            }
            value={couponCode}
            onChange={handleInputChange}
            onClick={handleInputClick}
            className={`w-full p-2 border border-gray-300 dark:border-gray-600 rounded mb-4 transition-transform duration-300 focus:ring-1 focus:ring-primary ${
              isInvalidCoupon || isEmptyCart || showCouponPlaceholder
                ? "animate-shake placeholder-red-500 dark:placeholder-red-500"
                : ""
            } placeholder-gray-500 dark:placeholder-gray-400 ${inputClass}`}
            disabled={isEmptyCart}
          />
          {!isEmptyCart && !showCouponPlaceholder && !isInvalidCoupon && (
            <p
              className={`text-lg font-medium mb-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Enter Coupon code <br />
              <span
                className={`text-primary font-extrabold ${
                  theme === "dark" ? "dark:text-primaryLight" : ""
                }`}
              >
                &apos;SHOPNOW10&apos;
              </span>{" "}
              for instant 10% off
            </p>
          )}
        </>
      )}
      <button
        onClick={handleCouponApply}
        className={`w-full py-2 rounded transition duration-300 ${
          isCouponApplied
            ? `${
                theme === "dark"
                  ? "bg-secondary text-primary"
                  : "bg-secondary text-primary"
              } font-bold pointer-events-none`
            : `${
                theme === "dark"
                  ? "bg-primaryDark hover:bg-primaryDarker"
                  : "bg-primary hover:bg-slate-950"
              } text-white`
        }`}
        disabled={isEmptyCart}
      >
        {isCouponApplied ? "Coupon Applied" : "Apply Coupon"}
      </button>
      <div
        className={`flex justify-between mt-4 font-bold text-2xl ${
          theme === "dark" ? "text-gray-200" : "text-gray-800"
        }`}
      >
        <p>Total:</p>
        <p>{formatCurrency(total)}</p>
      </div>
    </>
  );
};

export default CouponSection;
