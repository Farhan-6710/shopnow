"use client";

import React from "react";
import AddressSection from "./AddressSection";
import Marquee from "./Marquee";
import Dropdowns from "./Dropdowns";
import CartIcon from "./CartIcon";
import { useSelector } from "react-redux";
import { selectCartCount } from "@/redux/cart/cartSlice"; // Import RootState

const HeaderOne: React.FC = () => {
  // Get cart count and currency from Redux store
  const cartCount = useSelector(selectCartCount);
  return (
    <header className="bg-card transition-colors duration-200" role="banner">
      <div
        className="container mx-auto flex justify-center md:justify-between lg:justify-between items-center p-2 lg:px-16 md:p-2 gap-0 md:gap-6"
        aria-label="Main navigation"
      >
        <AddressSection />
        <Marquee />
        <Dropdowns /> {/* Dropdowns already uses currency from Redux */}
        <div className="block md:hidden relative mt-1">
          <CartIcon cartCount={cartCount} />
        </div>
      </div>
    </header>
  );
};

export default HeaderOne;
