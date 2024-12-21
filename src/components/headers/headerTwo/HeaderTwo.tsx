"use client";

import React from "react";
import Logo from "./Logo";
import SearchBarWithDropdown from "./SearchBarWithDropdown";
import CartButton from "./CartButton";
import { productsData } from "@/src/data/productsData"; // Import the products data
import { useSelector } from "react-redux";
import { RootState } from "@/src/store"; // Import RootState

interface HeaderTwoProps {
  onMenuClick: () => void;
  onSearchSelect: (productName: string) => void;
}

interface Product {
  id: number;
  productName: string;
  imgSource?: string;
  productPrice?: number;
  rating?: number;
}

const HeaderTwo: React.FC<HeaderTwoProps> = ({
  onMenuClick,
  onSearchSelect,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [showDropdown, setShowDropdown] = React.useState(false);

  // Get cart count from Redux store
  const cartCount = useSelector(
    (state: RootState) => state.cart.cartItems.length
  );

  return (
    <header className="text-gray-600 dark:text-gray-300 body-font bg-primary md:bg-white dark:bg-primary border-b border-gray-300 dark:border-gray-600 transition-colors duration-200">
      <div className="container mx-auto flex flex-wrap p-2 px-4 flex-col md:flex-row md:items-center space-x-5 md:space-x-0">
        {/* Logo and Menu */}
        <Logo onMenuClick={onMenuClick} />

        {/* Search Bar */}
        <SearchBarWithDropdown
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts}
          showDropdown={showDropdown}
          setShowDropdown={setShowDropdown}
          onSearchSelect={onSearchSelect}
          productsData={productsData} // Pass the full products data to SearchBarWithDropdown
        />

        {/* Cart */}
        <CartButton cartCount={cartCount} />
      </div>
    </header>
  );
};

export default HeaderTwo;
