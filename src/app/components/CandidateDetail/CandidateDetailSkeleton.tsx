"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CandidateDetailSkeleton() {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center z-50 p-10 overflow-auto">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-6xl space-y-4 overflow-auto">
        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>

        {/* Header */}
        <CandidateHeaderSkeleton />

        {/* Navigation */}
        <CandidateNavSkeleton />

        {/* Content */}
        <div className="min-h-96 p-4">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CandidateHeaderSkeleton() {
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

function CandidateNavSkeleton() {
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