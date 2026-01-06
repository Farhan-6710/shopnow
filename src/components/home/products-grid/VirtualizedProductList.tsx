"use client";

import { fetchImageWithTimeout } from "@/utils/fetchUtils";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Product } from "@/types/product";

interface Props {
  visibleItems: Product[];
  skeletonCount: number;
  isLoadingMore: boolean;
  hasLoadedAll: boolean;
  itemsPerRow: number;
  productCardRef: React.RefObject<HTMLElement | null>;
  productsGap: number;
  totalCount: number;
}

const VirtualizedProductList = ({
  visibleItems,
  skeletonCount,
  isLoadingMore,
  hasLoadedAll,
  itemsPerRow,
  productCardRef,
  productsGap,
  totalCount,
}: Props) => {
  return (
    <>
      {visibleItems.map((item, index) => (
        <ProductCard
          key={item.id}
          ref={index === 0 ? productCardRef : undefined}
          item={item}
          index={index}
          fetchImageWithTimeout={fetchImageWithTimeout}
          itemsPerRow={itemsPerRow}
          style={{ padding: productsGap }}
          priority={index < itemsPerRow}
        />
      ))}

      {skeletonCount > 0 &&
        Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={`sk-${i}`} />
        ))}

      {!hasLoadedAll && !isLoadingMore && (
        <div className="col-span-full text-center py-6 text-sm text-muted-foreground">
          Showing {visibleItems.length} of {totalCount}
        </div>
      )}
    </>
  );
};

export default VirtualizedProductList;
