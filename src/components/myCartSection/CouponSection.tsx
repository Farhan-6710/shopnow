import { useTheme } from "next-themes";
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
  total,
  formatCurrency,
}) => {
  const { theme } = useTheme();
  return (
    <>
      {!isCouponApplied && (
        <>
          <label htmlFor="coupon-code-input" className="sr-only">
            Coupon code
          </label>
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
            className={`w-full p-2 border rounded mb-4 transition-transform duration-300 focus:ring-1 focus:ring-primary ${
              isInvalidCoupon || isEmptyCart || showCouponPlaceholder
                ? "animate-shake placeholder-red-500 dark:placeholder-red-500"
                : ""
            } placeholder-gray-500 dark:placeholder-gray-400 ${inputClass}`}
            disabled={isEmptyCart}
          />
          {!isEmptyCart && !showCouponPlaceholder && !isInvalidCoupon && (
            <p className="text-lg font-medium mb-3 dark:text-gray-400 text-gray-500">
              Enter Coupon code <br />
              <span className="text-primary font-extrabold dark:text-primaryLight">
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
            ? `bg-secondary text-secondary-foreground font-bold pointer-events-none`
            : `bg-primary hover:bg-secondary text-primary-foreground hover:text-secondary-foreground cursor-pointer`
        }`}
        disabled={isEmptyCart}
        aria-label={isCouponApplied ? "Coupon applied" : "Apply coupon code"}
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
