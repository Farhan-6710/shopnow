"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Product } from "@/types/product";

export const useSearchProduct = (products: Product[]) => {
  const router = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const isHomePage = pathname === "/";

  // Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setOpen(true);
  };

  // Navigate to product page
  const selectProduct = (productName: string) => {
    router.push(`/products/${encodeURIComponent(productName)}`);
    setSearchTerm("");
    setOpen(false);
  };

  // Navigate to home page
  const showAllProducts = () => {
    router.push("/");
    setSearchTerm("");
    setOpen(false);
  };

  // Handle input focus
  const handleFocus = () => {
    setOpen(true);
  };

  // Handle input blur with delay for click events
  const handleBlur = () => {
    setTimeout(() => setOpen(false), 200);
  };

  return {
    searchTerm,
    open,
    isHomePage,
    filteredProducts,
    handleSearchChange,
    handleFocus,
    handleBlur,
    selectProduct,
    showAllProducts,
    setOpen,
  };
};
