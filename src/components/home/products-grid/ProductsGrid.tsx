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
  const threshold = cardHeight + productsGap / 2;

  const getInitialRows = () =>
    typeof window === "undefined"
      ? 3
      : window.innerHeight / cardHeight > 2
      ? 4
      : 3;

  const [initialRows] = useState(getInitialRows);

  const {
    visibleItems,
    skeletonCount,
    isLoadingMore,
    hasLoadedAll,
    itemsPerRow,
  } = usePageVirtualizedProducts<Product>({
    items: products,
    initialRows,
    threshold,
    rowHeight: cardHeight,
    loadingDelay: 500,
  });

  // Measure card height ONCE
  useEffect(() => {
    if (!productCardRef.current) return;
    const height = productCardRef.current.offsetHeight;
    setCardHeight((prev) => (prev === height ? prev : height));
  }, []);

  // Fake loading on product change
  useEffect(() => {
    if (!products.length) return;

    const run = async () => {
      setIsFakeLoading(true);
      await timeout(400);
      setIsFakeLoading(false);
    };

    run();
  }, [products]);

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
      aria-label="Product catalog"
    >
      {(isLoading || isCartSyncing || isWishlistSyncing || isFakeLoading) &&
        Array.from({ length: 10 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}

      {!isLoading &&
        !isCartSyncing &&
        !isWishlistSyncing &&
        !isFakeLoading &&
        error && (
          <div className="col-span-full text-center py-12">
            <p className="text-lg font-semibold text-destructive">
              Error loading products
            </p>
          </div>
        )}

      {!isLoading &&
        !isCartSyncing &&
        !isWishlistSyncing &&
        !isFakeLoading &&
        !error &&
        products.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-lg font-semibold">No products found</p>
          </div>
        )}

      {!isLoading &&
        !isCartSyncing &&
        !isWishlistSyncing &&
        !isFakeLoading &&
        !error &&
        products.length > 0 && (
          <VirtualizedProductList
            visibleItems={visibleItems}
            skeletonCount={skeletonCount}
            isLoadingMore={isLoadingMore}
            hasLoadedAll={hasLoadedAll}
            itemsPerRow={itemsPerRow}
            productCardRef={productCardRef}
            productsGap={productsGap}
            totalCount={products.length}
          />
        )}
    </section>
  );
};

export default ProductsGrid;
