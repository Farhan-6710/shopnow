"use client";

import React from "react";
import { Search } from "lucide-react";
import { Product } from "@/types/product";
import { useSearchProduct } from "@/hooks/useSearchProduct";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SearchBarProps {
  products: Product[];
}

const SearchBar: React.FC<SearchBarProps> = ({ products }) => {
  const {
    searchTerm,
    open,
    isHomePage,
    filteredProducts,
    handleSearchChange,
    handleFocus,
    handleBlur,
    selectProduct,
    showAllProducts,
  } = useSearchProduct(products);

  return (
    <div className="relative hidden md:flex justify-center md:w-6/12 mb-4 md:mb-0">
      <Command
        className="relative w-full rounded-md border border-muted-foreground/20 overflow-visible"
        shouldFilter={false}
      >
        <div className="relative flex items-center w-full">
          {/* Search Input */}
          <label htmlFor="search-products" className="sr-only">
            Search products
          </label>
          <input
            type="text"
            id="search-products"
            placeholder={open ? "Type to search..." : "Search products"}
            className="relative z-10 border-0 py-2 px-4 w-full h-10 font-bold text-foreground bg-red-500 placeholder-muted-foreground focus:outline-none focus:ring-0 rounded-l-md border-r border-muted-foreground/20"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-controls="search-results"
            aria-autocomplete="list"
          />

          {/* Search Icon */}
          <button
            type="button"
            aria-label="Search"
            className="w-10 h-10 flex items-center justify-center bg-card border-0 cursor-pointer rounded-r-md"
            tabIndex={-1}
          >
            <Search
              className="text-gray-500 dark:text-gray-300 w-4 h-4"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Dropdown Results */}
        {open && (
          <div className="absolute top-full left-0 right-0 mt-0 z-50">
            <CommandList
              id="search-results"
              className="bg-card border border-t-0 border-border max-h-60 overflow-y-auto shadow-lg rounded-b-md"
            >
              {/* Show All Products option (when not on homepage) */}
              {!isHomePage && searchTerm === "" && (
                <CommandGroup>
                  <CommandItem
                    onSelect={showAllProducts}
                    className="cursor-pointer p-3 px-4 hover:bg-accent font-semibold text-primary dark:text-gray-100 border-b dark:border-gray-600 data-[selected=true]:bg-muted"
                  >
                    Show All Products
                  </CommandItem>
                </CommandGroup>
              )}

              {/* Search results */}
              {searchTerm && (
                <>
                  <CommandEmpty className="p-3 px-4 text-muted-foreground">
                    No products found
                  </CommandEmpty>

                  <CommandGroup>
                    {filteredProducts.map((product) => (
                      <CommandItem
                        key={product.id}
                        value={product.productName}
                        onSelect={() => selectProduct(product.productName)}
                        className="cursor-pointer p-3 px-4 transition-colors hover:bg-accent text-gray-800 dark:text-gray-200 data-[selected=true]:bg-muted"
                      >
                        {product.productName}
                      </CommandItem>
                    ))}
                  </CommandGroup>

                  {/* Show All Products at bottom when searching on non-homepage */}
                  {!isHomePage && filteredProducts.length > 0 && (
                    <CommandGroup>
                      <CommandItem
                        onSelect={showAllProducts}
                        className="cursor-pointer p-3 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold text-primary dark:text-gray-100 border-t dark:border-gray-600 data-[selected=true]:bg-gray-100 dark:data-[selected=true]:bg-gray-700"
                      >
                        Show All Products
                      </CommandItem>
                    </CommandGroup>
                  )}
                </>
              )}
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
};

export default SearchBar;
