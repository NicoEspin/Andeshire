"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CandidateHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-6 border-b pb-6">
      {/* Top: Avatar & Basic Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Skeleton variant="circular" className="w-20 h-20" />
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-6 w-8" />
        </div>
      </div>

      {/* Contact & Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-36" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </div>
  );
}