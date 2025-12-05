"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { PRODUCTS_DATA } from "@/src/constants/products";
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
    <header className="text-gray-600 dark:text-gray-300 body-font bg-primary md:bg-white dark:bg-primaryDarkTwo border-y border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="container mx-auto flex flex-wrap p-2 px-4 flex-col md:flex-row md:items-center space-x-5 md:space-x-0">
        <Logo onMenuClick={onMenuClick} />
        <SearchBar products={PRODUCTS_DATA} />
        <CartButton cartCount={cartCount} />
      </div>
    </header>
  );
};

export default HeaderTwo;
