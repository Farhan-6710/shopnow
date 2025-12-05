"use client";

import React from "react";
import { Search } from "lucide-react";
import { Product } from "@/types/product";
import { useSearchProduct } from "@/src/hooks/useSearchProduct";

interface SearchBarProps {
  products: Product[];
}

const SearchBar: React.FC<SearchBarProps> = ({ products }) => {
  const {
    searchRef,
    searchTerm,
    showDropdown,
    highlightedIndex,
    isHomePage,
    filteredProducts,
    handleSearchChange,
    handleFocus,
    handleKeyDown,
    selectProduct,
    showAllProducts,
    setHighlightedIndex,
  } = useSearchProduct(products);

  return (
    <div
      ref={searchRef}
      className="relative hidden md:flex justify-center md:w-6/12 mb-4 md:mb-0 pl-0 lg:pl-10 xl:pl-6"
    >
      <div className="relative flex items-center lg:w-full">
        {/* Search Input */}
        <input
          type="text"
          placeholder={showDropdown ? "Type to search..." : "Search products"}
          className="relative z-10 border border-gray-300 dark:border-gray-500 py-2 px-4 w-full h-10 font-bold text-primaryDarkTwo dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600"
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />

        {/* Search Icon */}
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-500 cursor-pointer">
          <Search className="text-gray-500 dark:text-gray-300 w-4 h-4" />
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <ul className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-t-0 border-gray-300 dark:border-gray-500 max-h-60 overflow-y-auto shadow-lg z-20">
          {/* Show All Products option (when not on homepage) */}
          {!isHomePage && searchTerm === "" && (
            <li
              className="cursor-pointer p-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold text-primary dark:text-gray-100 border-b dark:border-gray-600"
              onClick={showAllProducts}
            >
              Show All Products
            </li>
          )}

          {/* Search results */}
          {searchTerm && (
            <>
              {filteredProducts.length === 0 ? (
                <li className="p-3 px-4 text-gray-500 dark:text-gray-400">
                  No products found
                </li>
              ) : (
                filteredProducts.map((product, index) => (
                  <li
                    key={product.id}
                    className={`cursor-pointer p-3 px-4 transition-colors ${
                      index === highlightedIndex
                        ? "bg-gray-200 dark:bg-gray-600"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    } text-gray-800 dark:text-gray-200`}
                    onClick={() => selectProduct(product.productName)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {product.productName}
                  </li>
                ))
              )}

              {/* Show All Products at bottom when searching on non-homepage */}
              {!isHomePage && (
                <li
                  className="cursor-pointer p-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold text-primary dark:text-gray-100 border-t dark:border-gray-600"
                  onClick={showAllProducts}
                >
                  Show All Products
                </li>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
