import { Skeleton } from "@/components/ui/skeleton";

export default function AiAssistantSkeleton() {
  return (
    <div className="flex flex-col h-full bg-background border border-border rounded-lg shadow-sm">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between p-4 border-b border-border h-16">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      {/* Chat Area Skeleton */}
      <div className="flex-1 p-4 space-y-6 overflow-hidden">
        {/* Welcome Message Skeleton (Center) */}
        <div className="flex flex-col items-center justify-center space-y-4 mt-8">
          <Skeleton className="w-16 h-16 rounded-full" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Dummy Message Bubbles Skeleton (for visual hint) */}
        <div className="space-y-4 mt-auto pt-8">
          <div className="flex justify-start">
            <Skeleton className="h-12 w-2/3 rounded-xl rounded-tl-none" />
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="p-4 border-t border-border mt-auto">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
