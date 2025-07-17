"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CandidateNavSkeleton() {
  return (
    <div className="flex space-x-6 border-b px-4">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="flex items-center gap-1 pb-2 -mb-px">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}