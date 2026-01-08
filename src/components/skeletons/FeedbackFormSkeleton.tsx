import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function FeedbackFormSkeleton() {
  return (
    <div className="w-full space-y-6 py-4">
      {/* Heading Skeleton */}
      <Skeleton className="h-7 w-48 mb-6 mx-auto" />

      {/* Dropdowns Row Skeleton */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Textarea Skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-3 w-32" />
      </div>

      {/* Buttons Skeleton */}
      <div className="flex gap-3">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}
