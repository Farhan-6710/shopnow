"use client";

import React from "react";
import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  filteredProducts: Product[];
  visibleItems: Product[];
  skeletonCount: number;
  isLoadingMore: boolean;
  hasLoadedAll: boolean;
  itemsPerRow: number;
  productCardRef: React.RefObject<HTMLElement | null>;
  productsGap: number;
}

const VirtualizedProductList = ({
  filteredProducts,
  visibleItems,
  skeletonCount,
  isLoadingMore,
  hasLoadedAll,
  itemsPerRow,
  productCardRef,
  productsGap,
}: Props) => {
  return (
    <section className="w-full product-card-wrapper grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 h-fit p-3">
      {visibleItems.map((item, index) => (
        <ProductCard
          key={item.id}
          ref={index === 0 ? productCardRef : undefined}
          index={index}
          item={item}
          fetchImageWithTimeout={fetchImageWithTimeout}
          itemsPerRow={itemsPerRow}
          style={{ padding: productsGap }}
          priority={index < itemsPerRow}
        />
      ))}

      {skeletonCount > 0 &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={`s-${i}`} />
        ))}

      {!hasLoadedAll && !isLoadingMore && visibleItems.length > 0 && (
        <div className="col-span-full text-center py-8 text-sm text-muted-foreground">
          Scroll down to load more products ({visibleItems.length} of{" "}
          {filteredProducts.length})
        </div>
      )}

      {hasLoadedAll && filteredProducts.length > itemsPerRow * 2 && (
        <div className="col-span-full text-center py-8 text-sm text-muted-foreground">
          All {filteredProducts.length} products loaded
        </div>
      )}
    </section>
  );
};

export default VirtualizedProductList;
