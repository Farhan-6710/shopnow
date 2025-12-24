import { ChangeEvent, useState } from "react";

interface UseCartCouponProps {
  cartItemsCount: number;
}

export const useCartCoupon = ({ cartItemsCount }: UseCartCouponProps) => {
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isInvalidCoupon, setIsInvalidCoupon] = useState(false);
  const [showCouponPlaceholder, setShowCouponPlaceholder] = useState(false);

  const VALID_COUPON_CODE = "SHOPNOW10";
  const DISCOUNT_PERCENTAGE = 0.1;

  const handleCouponApply = () => {
    // Empty cart check
    if (cartItemsCount === 0) {
      setIsInvalidCoupon(false);
      setShowCouponPlaceholder(false);
      return;
    }

    // Empty input check
    if (couponCode.trim() === "") {
      setIsInvalidCoupon(false);
      setShowCouponPlaceholder(true);
      return;
    }

    // Validate coupon
    if (couponCode === VALID_COUPON_CODE) {
      setIsCouponApplied(true);
      setIsInvalidCoupon(false);
      setShowCouponPlaceholder(false);
    } else {
      setIsInvalidCoupon(true);
      setCouponCode("");
      setShowCouponPlaceholder(false);
    }
  };

  const handleInputClick = () => {
    if (isInvalidCoupon || showCouponPlaceholder) {
      setIsInvalidCoupon(false);
      setShowCouponPlaceholder(false);
      setCouponCode("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  const getDiscount = (subtotal: number) => {
    return isCouponApplied ? DISCOUNT_PERCENTAGE * subtotal : 0;
  };

  return {
    couponCode,
    isCouponApplied,
    isInvalidCoupon,
    showCouponPlaceholder,
    handleCouponApply,
    handleInputClick,
    handleInputChange,
    getDiscount,
  };
};
