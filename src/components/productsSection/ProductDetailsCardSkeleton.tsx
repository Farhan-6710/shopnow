"use client"; // Ensures this component is rendered on the client side

import React from "react";
import { Skeleton } from "@/src/components/ui/skeleton"; // Assuming you have ShadCN's Skeleton component available

const ProductDetailsCardSkeleton: React.FC = () => {
  return (
    <div className="px-4 md:px-2 p-2 w-full flex flex-col md:flex-row h-full">
      <div className="product-card transition-all duration-200 dark:bg-gray-900 w-full">
        <div className="p-4 border flex flex-col md:flex-row justify-center items-center text-center md:text-left h-full pt-4 pb-8 overflow-hidden transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-slate-700">
          {/* Product Image Skeleton on the Left */}
          <div className="w-full pt-4 md:w-1/3 md:pl-4 md:mb-4 flex justify-center">
            <Skeleton className="w-full h-40 md:h-72 bg-gray-200" />
          </div>

          {/* Product Info and Actions Skeleton on the Right */}
          <div className="w-full md:w-2/3 flex flex-col justify-between items-start p-0 py-4 md:p-4 md:pr-10">
            {/* Product Name Skeleton */}
            <Skeleton className="w-3/4 h-12 bg-gray-200 mb-4" />

            {/* Product Description Skeleton */}
            <Skeleton className="w-full h-64 md:h-24 bg-gray-200 mb-4" />

            <div className="flex flex-col justify-center items-start flex-grow gap-2 w-full">
              {/* Price and Rating Skeleton */}
              <Skeleton className="w-2/4 md:w-1/4 h-10 bg-gray-200" />
              {/* Action Buttons Skeleton */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Skeleton className="w-2/4 md:w-1/4 h-10 bg-gray-200" />
                <Skeleton className="w-2/4 md:w-1/4 h-10 bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCardSkeleton;
