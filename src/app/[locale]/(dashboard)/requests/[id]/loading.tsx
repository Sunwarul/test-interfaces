"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function RequestDetailLoading() {
    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Map skeleton */}
            <div className="flex-1 relative">
                <Skeleton className="absolute inset-0" />
            </div>

            {/* Bottom sheet skeleton */}
            <div className="bg-white rounded-t-[32px] shadow-[-4px_0_24px_rgba(0,0,0,0.2)]">
                <div className="px-6 pt-6 pb-4">
                    <Skeleton className="h-12 w-40 mb-2" />
                    <Skeleton className="h-4 w-24" />
                </div>
                <div className="px-6 pb-6 space-y-4">
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-6 w-full" />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-6 w-full" />
                        </div>
                    </div>
                </div>
                <div className="px-6 pb-8">
                    <Skeleton className="h-14 w-full rounded-[32px]" />
                </div>
            </div>
        </div>
    );
}