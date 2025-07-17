"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CandidateContentSkeleton() {
  return (
    <div className="min-h-96 p-4">
      <Skeleton className="h-6 w-48 mb-4" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      
      <div className="mt-8 space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}