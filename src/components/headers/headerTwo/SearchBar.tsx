"use client";

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

const SearchBar = ({ products }: SearchBarProps) => {
  const {
    searchTerm,
    open,
    filteredProducts,
    handleSearchChange,
    handleFocus,
    handleBlur,
    selectProduct,
  } = useSearchProduct(products);

  return (
    <div className="relative hidden md:flex justify-center md:w-6/12 mb-4 md:mb-0 pl-8">
      <Command
        className="relative w-full rounded-md border border-muted-foreground/20 overflow-visible"
        shouldFilter={false}
      >
        <div className="relative flex items-center w-full">
          <label htmlFor="search-products" className="sr-only">
            Search products
          </label>
          <input
            type="text"
            id="search-products"
            placeholder={open ? "Type to search..." : "Search products"}
            className="relative z-10 px-3 w-full h-9 text-sm font-semibold text-foreground bg-card placeholder-muted-foreground focus:outline-primary rounded-l-md"
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

          <button
            type="button"
            aria-label="Search"
            className="w-10 h-8 flex items-center justify-center bg-card cursor-pointer rounded-r-md border-l border-muted-foreground/20"
            tabIndex={-1}
          >
            <Search
              className="text-gray-500 dark:text-gray-300 w-3.5 h-3.5"
              aria-hidden="true"
            />
          </button>
        </div>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-0 z-50">
            <CommandList
              id="search-results"
              className="bg-card border border-t-0 border-border max-h-60 overflow-y-auto shadow-lg rounded-b-md"
            >
              {searchTerm && (
                <>
                  <CommandEmpty className="p-2 px-3 text-sm text-muted-foreground">
                    No products found
                  </CommandEmpty>

                  <CommandGroup>
                    {filteredProducts.map((product) => (
                      <CommandItem
                        key={product.id}
                        value={product.name}
                        onSelect={() => selectProduct(product.name)}
                        className="cursor-pointer p-2 px-3 text-sm transition-colors hover:bg-accent text-gray-800 dark:text-gray-200 data-[selected=true]:bg-muted"
                      >
                        {product.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
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
