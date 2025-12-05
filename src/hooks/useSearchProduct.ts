"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Product } from "@/types/product";

export const useSearchProduct = (products: Product[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const isHomePage = pathname === "/";

  // Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Navigate to product page
  const selectProduct = (productName: string) => {
    setSearchTerm("");
    setShowDropdown(false);
    setHighlightedIndex(-1);
    router.push(`/products/${productName}`);
  };

  // Navigate to home page
  const showAllProducts = () => {
    setSearchTerm("");
    setShowDropdown(false);
    router.push("/");
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
    setHighlightedIndex(-1);
  };

  // Handle input focus
  const handleFocus = () => {
    setShowDropdown(true);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || filteredProducts.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredProducts.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredProducts.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0) {
          selectProduct(filteredProducts[highlightedIndex].productName);
        }
        break;
      case "Escape":
        setShowDropdown(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
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
  };
};
