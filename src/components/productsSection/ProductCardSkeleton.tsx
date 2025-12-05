"use client";

import { Skeleton } from "@/src/components/ui/skeleton"; // Import the Skeleton component
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="px-4 md:px-2 p-2 w-full flex flex-col h-full">
      <div className="product-card skeleton-card bg-white shadow-for-light border-gray-200 dark:bg-primaryDarkTwo dark:border-slate-600">
        <div className="border flex flex-col justify-start items-center text-center h-full p-6 pb-8 overflow-hidden dark:border-slate-700">
          {/* Image Skeleton */}
          <Skeleton className="w-full h-40 xl:h-32 2xl:h-44 rounded-md dark:bg-slate-700" />

          <div className="mt-4 w-full text-center">
            {/* Product Title Skeleton */}
            <Skeleton className="w-3/4 h-6 mb-3 dark:bg-slate-700" />{" "}
            {/* Add mx-auto for centering */}
            {/* Price Skeleton */}
            <Skeleton className="w-1/2 h-6 mb-3 dark:bg-slate-700" />{" "}
            {/* Center price */}
            {/* Rating Skeleton */}
            <Skeleton className="w-1/4 h-4 mb-3 dark:bg-slate-700" />{" "}
            {/* Center rating */}
            {/* Description Skeleton */}
            <Skeleton className="w-3/4 h-8 dark:bg-slate-700" />{" "}
            {/* Center rating */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
