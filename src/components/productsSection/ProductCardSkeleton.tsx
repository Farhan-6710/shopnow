"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

const ProductCardSkeleton = () => {
  const { theme } = useTheme();

  return (
    <article className="px-4 md:px-2 p-2 w-full flex flex-col h-full">
      <div className="transition-all duration-200 border-border">
        <div
          className={`product-card border bg-card text-center h-full pt-0 pb-3.5 overflow-hidden transition-all duration-300 rounded-lg ${
            theme === "dark" ? "shadow-for-dark" : "shadow-for-light"
          }`}
        >
          <div className="flex flex-col justify-center items-center p-4">
            {/* Image Skeleton */}
            <Skeleton className="w-full h-24 rounded-lg" />

            {/* Product Details Skeleton */}
            <div className="mt-4 w-full px-4">
              {/* Product Title Skeleton */}
              <Skeleton className="w-3/4 h-5 mx-auto mb-2" />

              {/* Price Skeleton */}
              <Skeleton className="w-1/3 h-5 mx-auto mb-2" />

              {/* Rating Skeleton */}
              <Skeleton className="w-3/4 h-4 mx-auto mb-2" />
            </div>

            {/* Action Button Skeleton */}
            <div className="mt-2 w-full">
              <Skeleton className="w-3/4 h-9 mx-auto rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCardSkeleton;
