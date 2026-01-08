import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginFormSkeleton() {
  return (
    <div className="w-full space-y-4">
      {/* Heading Skeleton */}
      <Skeleton className="h-8 w-32 mb-6 mx-auto" />

      {/* Input Fields Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Form Button Skeleton */}
      <Skeleton className="h-10 w-full mb-4" />

      {/* Divider Skeleton */}
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="flex-1 h-px" />
        <Skeleton className="h-4 w-8" />
        <Skeleton className="flex-1 h-px" />
      </div>

      {/* Google Button Skeleton */}
      <Skeleton className="h-10 w-full mb-4" />

      {/* Footer Text Skeleton */}
      <div className="flex justify-center gap-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-16" />
      </div>

      <Skeleton className="h-px w-full my-4" />

      <Skeleton className="h-4 w-48 mx-auto" />
    </div>
  );
}
