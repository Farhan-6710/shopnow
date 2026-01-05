"use client";

import React from "react";
import { Product } from "@/types/product";
import FilterProducts from "./FilterProducts";
import { ProductFilterValues } from "@/types/filterProduct";

interface Props {
  filterValues: ProductFilterValues;
  products: Product[];
  onToggleCategory: (v: string) => void;
  onTogglePriceRange: (v: string) => void;
  onToggleColor: (v: string) => void;
  onSortByPrice: (v: "asc" | "desc") => void;
  onResetFilters: () => void;
}

const ProductsFiltersPanel = (props: Props) => {
  return <FilterProducts {...props} productsFromApiRes={props.products} />;
};

export default ProductsFiltersPanel;
