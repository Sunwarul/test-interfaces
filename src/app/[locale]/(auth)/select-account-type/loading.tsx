"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo skeleton */}
      <div className="absolute left-6 top-[59px] z-10">
        <Skeleton className="h-[41px] w-[110px] rounded" />
      </div>

      {/* Illustration skeleton */}
      <div className="h-[380px] -mx-6">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Content skeleton */}
      <div className="flex-1 flex flex-col px-6 -mt-16">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-48" />

          <div className="flex flex-col gap-2">
            <Skeleton className="h-[88px] w-full rounded-3xl" />
            <Skeleton className="h-[88px] w-full rounded-3xl" />
          </div>
        </div>
      </div>

      {/* Button skeleton */}
      <div className="px-6 pb-8 pt-4">
        <Skeleton className="h-14 w-full rounded-full" />
      </div>
    </div>
  );
}