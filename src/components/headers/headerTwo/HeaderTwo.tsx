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
        className="container mx-auto flex p-2 px-3 lg:px-16 flex-col md:flex-row items-center space-y-3 md:space-y-0 md:justify-between md:gap-4"
        aria-label="Secondary navigation"
      >
        <Logo onMenuClick={onMenuClick} />
        <SearchBar products={PRODUCTS_DATA} />
        <CartButton cartCount={cartCount} />
      </nav>
    </header>
  );
};

export default HeaderTwo;
