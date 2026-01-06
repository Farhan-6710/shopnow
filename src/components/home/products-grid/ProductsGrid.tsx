"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "@/types/product";
import { usePageVirtualizedProducts } from "@/hooks/usePageVirtualizedProducts";
import { useSelector } from "react-redux";
import { selectCartSyncing } from "@/redux/cart";
import { selectWishlistSyncing } from "@/redux/wishlist";
import { timeout } from "@/utils/timeout";
import ProductCardSkeleton from "./ProductCardSkeleton";
import VirtualizedProductList from "./VirtualizedProductList";

interface Props {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
}

const ProductsGrid = ({ products, isLoading, error }: Props) => {
  const isCartSyncing = useSelector(selectCartSyncing);
  const isWishlistSyncing = useSelector(selectWishlistSyncing);

  const productCardRef = useRef<HTMLElement>(null);
  const [cardHeight, setCardHeight] = useState(450);
  const [isFakeLoading, setIsFakeLoading] = useState(false);

  const productsGap = 8;

  // Measure card height safely
  useEffect(() => {
    if (!productCardRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;

      // 🚨 Guard: ignore invalid or zero heights
      if (!height || height < 50) return;

      setCardHeight((prev) => (Math.abs(prev - height) > 2 ? height : prev));

      setCardHeight((prev) => (Math.abs(prev - height) > 2 ? height : prev));
    });

    observer.observe(productCardRef.current);
    return () => observer.disconnect();
  }, []);

  // Fake loading on product change (UNCHANGED)
  useEffect(() => {
    if (!products.length) return;

    const run = async () => {
      setIsFakeLoading(true);
      await timeout(400);
      setIsFakeLoading(false);
    };

    run();
  }, [products]);

  const isBusy =
    isLoading || isCartSyncing || isWishlistSyncing || isFakeLoading;

  const {
    visibleItems,
    topSpacerHeight,
    bottomSpacerHeight,
    itemsPerRow,
    renderedItemCount,
  } = usePageVirtualizedProducts({
    items: products,
    rowHeight: cardHeight,
  });

  console.log(cardHeight);

  return (
    <section
      className="
        w-full
        product-card-wrapper
        grid
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
        h-fit
        p-3
      "
    >
      {isBusy &&
        Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}

      {!isBusy && error && (
        <div className="col-span-full text-center py-12">
          <p className="text-lg font-semibold text-destructive">
            Error loading products
          </p>
        </div>
      )}

      {!isBusy && !error && products.length === 0 && (
        <div className="col-span-full text-center py-12">
          <p className="text-lg font-semibold">No products found</p>
        </div>
      )}

      {!isBusy && !error && products.length > 0 && (
        <VirtualizedProductList
          visibleItems={visibleItems}
          topSpacerHeight={topSpacerHeight}
          bottomSpacerHeight={bottomSpacerHeight}
          itemsPerRow={itemsPerRow}
          renderedItemCount={renderedItemCount}
          productCardRef={productCardRef}
          productsGap={productsGap}
          totalCount={products.length}
        />
      )}
    </section>
  );
};

export default ProductsGrid;
