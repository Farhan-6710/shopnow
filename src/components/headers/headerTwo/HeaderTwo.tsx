"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { PRODUCTS_DATA } from "@/constants/products";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CartButton from "./CartButton";

interface HeaderTwoProps {
  onMenuClick: () => void;
}

const HeaderTwo: React.FC<HeaderTwoProps> = ({ onMenuClick }) => {
  const cartCount = useSelector(
    (state: RootState) => state.cart.cartItems.length
  );

  return (
    <header
      className="bg-card text-gray-600 dark:text-gray-300 body-font border-y border-border transition-colors duration-200"
      role="banner"
    >
      <nav
        className="mx-auto w-full px-6 sm:px-6 lg:px-20"
        aria-label="Secondary navigation"
      >
        {/* Desktop Layout */}
        <div className="flex items-center justify-between gap-4 py-3">
          {/* Logo - Left */}
          <div className="shrink-0 w-full md:w-fit">
            <Logo onMenuClick={onMenuClick} />
          </div>

          {/* Search Bar - Center - Hidden on Mobile/Tablet */}
          <div className="hidden md:block flex-1">
            <SearchBar products={PRODUCTS_DATA} />
          </div>

          {/* Cart & AI - Right - Hidden on Mobile/Tablet */}
          <div className="hidden md:flex shrink-0">
            <CartButton cartCount={cartCount} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderTwo;
