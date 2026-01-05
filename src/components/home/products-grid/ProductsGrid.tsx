"use client";

import React from "react";
import { Product } from "@/types/product";
import ProductCardSkeleton from "./ProductCardSkeleton";
import VirtualizedProductList from "./VirtualizedProductList";
import { useSelector } from "react-redux";
import { selectCartSyncing } from "@/redux/cart";
import { selectWishlistSyncing } from "@/redux/wishlist";

interface Props {
  isLoading: boolean;
  error: unknown;
  filteredProducts: Product[];
  visibleItems: Product[];
  skeletonCount: number;
  isLoadingMore: boolean;
  hasLoadedAll: boolean;
  itemsPerRow: number;
  productCardRef: React.RefObject<HTMLElement | null>;
  productsGap: number;
}

const ProductsGrid = ({
  isLoading,
  error,
  filteredProducts,
  ...listProps
}: Props) => {
  const isCartSyncing = useSelector(selectCartSyncing);
  const isWishlistSyncing = useSelector(selectWishlistSyncing);

  if (isLoading || isCartSyncing || isWishlistSyncing) {
    return (
      <section className="w-full product-card-wrapper grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-fit p-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-lg font-semibold text-destructive">
          Error loading products
        </p>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-lg font-semibold">No products found</p>
      </div>
    );
  }

  return (
    <VirtualizedProductList
      {...listProps}
      filteredProducts={filteredProducts}
    />
  );
};

export default ProductsGrid;
