"use client";

import React from "react";
import AddressSection from "./AddressSection";
import Marquee from "./Marquee";
import Dropdowns from "./Dropdowns";
import CartIcon from "./CartIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Import RootState

const HeaderOne: React.FC = () => {
  // Get cart count and currency from Redux store
  const cartCount = useSelector(
    (state: RootState) => state.cart.cartItems.length
  );

  return (
    <header className="bg-card transition-colors duration-200" role="banner">
      <div
        className="container mx-auto flex justify-center md:justify-center lg:justify-between items-center p-4 md:p-2 pr-0 pl-1 space-x-0 md:space-x-8"
        aria-label="Main navigation"
      >
        <AddressSection />
        <Marquee />
        <Dropdowns /> {/* Dropdowns already uses currency from Redux */}
        <CartIcon cartCount={cartCount} />
      </div>
    </header>
  );
};

export default HeaderOne;
