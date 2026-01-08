"use client";

import { Skeleton } from "@/components/ui/skeleton";
const WishlistSkeleton = () => {
  return (
    <section
      className="bg-background transition-colors duration-300 min-h-[60vh]"
      aria-label="Loading wishlist"
    >
      <div className="container mx-auto px-4 lg:px-20 py-8">
        {/* Wishlist Header Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <Skeleton className="h-10 w-44 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>

        {/* Wishlist Items Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Wishlist Item Skeleton - Repeat 4 times */}
          {[1, 2, 3, 4].map((index) => (
            <article
              key={index}
              className="bg-card border rounded-lg overflow-hidden h-full flex flex-col"
            >
              {/* Image Area Skeleton (Matches aspect-square layout) */}
              <div className="flex items-center justify-center py-4 border-b bg-muted/20">
                <div className="relative w-2/3 aspect-square">
                  <Skeleton className="w-full h-full rounded-md" />
                </div>
              </div>

              {/* Product Details Skeleton */}
              <div className="p-4 flex flex-col gap-2">
                {/* Title */}
                <Skeleton className="h-5 w-3/4" />

                {/* Brand */}
                <Skeleton className="h-3 w-1/2" />

                {/* Price and Rating */}
                <div className="flex items-center justify-between mt-1">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>

                {/* Action Buttons Skeleton */}
                <div className="mt-4 w-fit ml-auto">
                  <Skeleton className="h-9 w-28 rounded-md" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishlistSkeleton;
