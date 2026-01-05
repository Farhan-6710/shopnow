import { useTheme } from "next-themes";
import React, { useRef, useState } from "react";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";

interface CouponProps {
  isCouponApplied: boolean;
  showCouponPlaceholder: boolean;
  isInvalidCoupon: boolean;
  couponCode: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | null>) => void;
  handleInputClick: () => void;
  handleCouponApply: () => void;
  inputClass: string;
  total: number; // Add total prop
  formatCurrency: (amount: number) => string; // Add formatCurrency function prop
}

const Coupon: React.FC<CouponProps> = ({
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleSubmitCoupon = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      handleCouponApply();
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {!isCouponApplied && (
        <>
          <label htmlFor="coupon-code-input" className="sr-only">
            Coupon code
          </label>
          <input
            ref={inputRef}
            type="text"
            id="coupon-code-input"
            placeholder={
              showCouponPlaceholder
                ? "Enter Coupon Code"
                : isInvalidCoupon
                ? "Coupon Not Found"
                : "Enter Coupon Code"
            }
            value={couponCode}
            onChange={handleInputChange}
            onClick={handleInputClick}
            className={`w-full p-2 px-4 border rounded-lg mb-4 transition-transform duration-300 outline-primary ${
              isInvalidCoupon || showCouponPlaceholder
                ? "animate-shake placeholder-red-500 dark:placeholder-red-500"
                : ""
            } placeholder-gray-500 dark:placeholder-gray-400 ${inputClass}`}
          />
          {!showCouponPlaceholder && !isInvalidCoupon && (
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
      <Button
        onClick={handleSubmitCoupon}
        size="lg"
        disabled={loading || couponCode.trim() === "" || isCouponApplied}
        className={`w-full rounded-lg transition duration-300 flex items-center justify-center ${
          isCouponApplied
            ? `bg-secondary text-secondary-foreground font-bold pointer-events-none`
            : `bg-primary hover:bg-primary/80 text-primary-foreground hover:text-primary-foreground cursor-pointer`
        }`}
        aria-label={isCouponApplied ? "Coupon applied" : "Apply coupon code"}
      >
        {isCouponApplied ? (
          "Coupon Applied"
        ) : loading ? (
          <Spinner className="size-6" />
        ) : (
          "Apply Coupon"
        )}
      </Button>
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

export default Coupon;
