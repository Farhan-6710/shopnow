"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

const CartSectionSkeleton = () => {
  const { theme } = useTheme();

  return (
    <section
      className="bg-background transition-colors duration-300 min-h-[60vh]"
      aria-label="Loading cart"
    >
      <div className="container mx-auto px-4 lg:px-20 py-8">
        {/* Cart Header Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Skeleton className="h-10 w-44 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>

        {/* Cart Content Skeleton */}
        <div className="flex flex-wrap lg:flex-nowrap gap-3 md:gap-4">
          {/* Cart Items List Skeleton */}
          <div className="w-full lg:w-8/12 bg-card h-fit">
            {/* Cart Item Skeleton - Repeat 3 times */}
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className={`flex flex-col xs:flex-row items-center justify-between px-4 md:px-8 py-4 h-fit ${
                  index === 1 ? "border-t border-x" : "border"
                }`}
              >
                {/* Image Skeleton */}
                <div className="relative flex justify-center items-center w-28 xs:w-24 h-24">
                  <Skeleton className="w-full h-full rounded" />
                </div>

                {/* Product Details Skeleton */}
                <div className="flex flex-col justify-center items-center xs:items-start w-full xs:w-8/12 xs:pl-4 mt-4 xs:mt-0">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-5 w-1/3" />
                </div>

                {/* Actions Skeleton */}
                <div className="flex flex-col xs:flex-row items-center xs:space-x-4 xs:w-auto mt-4 xs:mt-0">
                  <Skeleton className="h-9 w-32 rounded-lg" />
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Skeleton */}
          <section
            className={`w-full lg:w-4/12 border p-4 rounded ${
              theme === "dark" ? "bg-card shadow-sm" : "bg-white shadow-sm"
            } h-fit`}
          >
            {/* Summary Header */}
            <Skeleton className="h-6 w-32 mb-4" />

            {/* Price Breakdown */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>

            {/* Divider */}
            <Skeleton className="h-px w-full mb-4" />

            {/* Total */}
            <div className="flex justify-between mb-4">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>

            {/* Coupon Section */}
            <div className="mb-4">
              <Skeleton className="h-10 w-full rounded-md mb-2" />
              <Skeleton className="h-9 w-full rounded-md" />
            </div>

            {/* Payment Methods */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-32 mb-2" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-12 rounded" />
                <Skeleton className="h-8 w-12 rounded" />
                <Skeleton className="h-8 w-12 rounded" />
                <Skeleton className="h-8 w-12 rounded" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default CartSectionSkeleton;
