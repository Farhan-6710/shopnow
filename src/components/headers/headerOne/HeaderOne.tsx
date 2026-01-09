"use client";

import React from "react";
import AddressSection from "./AddressSection";
import Marquee from "./Marquee";
import Dropdowns from "./Dropdowns";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/redux/slices/cartSlice";
import { selectWishlistCount } from "@/redux/slices/wishlistSlice";

const HeaderOne: React.FC = () => {
  // Get cart count and currency from Redux store
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistCount);
  return (
    <header className="bg-card transition-colors duration-200" role="banner">
      <div
        className="container mx-auto flex justify-center md:justify-between lg:justify-between items-center gap-0 md:gap-6 p-2 lg:px-16"
        aria-label="Main navigation"
      >
        <AddressSection />
        <Marquee />
        <Dropdowns /> {/* Dropdowns already uses currency from Redux */}
        <div className="flex md:hidden items-center gap-3 mt-1 pl-4">
          <div className="relative">
            <WishlistIcon wishlistCount={wishlistCount} />
          </div>
          <div className="relative">
            <CartIcon cartCount={cartCount} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderOne;
