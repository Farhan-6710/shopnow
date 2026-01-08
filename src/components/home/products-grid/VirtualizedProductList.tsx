"use client";

import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

interface Props {
  visibleItems: Product[];
  topSpacerHeight: number;
  bottomSpacerHeight: number;
  itemsPerRow: number;
  renderedItemCount: number;
  productCardRef: React.RefObject<HTMLElement | null>;
  productsGap: number;
  totalCount: number;
}

const VirtualizedProductList = ({
  visibleItems,
  topSpacerHeight,
  bottomSpacerHeight,
  itemsPerRow,
  renderedItemCount,
  productCardRef,
  productsGap,
  totalCount,
}: Props) => {
  return (
    <>
      {/* Top spacer preserves scroll position */}
      <div className="col-span-full" style={{ height: topSpacerHeight }} />

      {visibleItems.map((item, index) => (
        <ProductCard
          key={item.id}
          ref={index === 0 ? productCardRef : undefined}
          item={item}
          index={index}
          itemsPerRow={itemsPerRow}
          style={{ padding: productsGap }}
          priority={index < 10}
        />
      ))}

      {/* Bottom spacer */}
      <div style={{ height: bottomSpacerHeight }} />

      <div className="col-span-full text-center py-6 text-sm text-muted-foreground">
        Showing {renderedItemCount} of {totalCount}
      </div>
    </>
  );
};

export default VirtualizedProductList;
