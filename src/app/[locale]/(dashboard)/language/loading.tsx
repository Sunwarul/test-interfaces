"use client";

export default function Loading() {
    return (
        <div className="relative w-[414px] h-[896px] bg-white overflow-hidden rounded-[40px] flex flex-col">
            {/* Header skeleton */}
            <div className="pt-[59px] pb-4 px-6">
                <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-black-10 rounded-[32px] animate-pulse" />
                    <div className="h-8 w-40 bg-black-10 rounded animate-pulse" />
                </div>
            </div>

            {/* Search bar skeleton */}
            <div className="px-6 pb-4">
                <div className="h-10 bg-black-5 rounded-[24px] animate-pulse" />
            </div>

            {/* List skeleton */}
            <div className="flex-1 px-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-[60px] flex items-center justify-between border-b border-black-10"
                    >
                        <div className="h-5 w-24 bg-black-10 rounded animate-pulse" />
                        <div className="w-10 h-10 rounded-full bg-black-10 animate-pulse" />
                    </div>
                ))}
            </div>
        </div>
    );
}