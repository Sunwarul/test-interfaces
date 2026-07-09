import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex flex-col gap-6">
            {/* Page Title Skeleton */}
            <Skeleton className="h-10 w-48" />

            {/* Main Content Card Skeleton */}
            <div className="rounded-2xl border border-[var(--border-black-10)] bg-white p-6">
                {/* Filters Skeleton */}
                <div className="flex h-14 items-center gap-4 border-b border-[var(--border-black-10)]">
                    <Skeleton className="h-8 w-[200px]" />
                    <Skeleton className="h-8 w-[160px]" />
                    <Skeleton className="h-8 w-[160px]" />
                    <div className="ml-auto">
                        <Skeleton className="h-10 w-[180px] rounded-full" />
                    </div>
                </div>

                {/* Table Header Skeleton */}
                <div className="flex h-12 items-center gap-4 border-b border-[var(--border-black-10)] bg-gray-50 px-4">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-32" />
                </div>

                {/* Table Rows Skeleton */}
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="flex h-16 items-center gap-4 border-b border-[var(--border-black-10)] px-4"
                    >
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <div className="flex gap-2">
                            <Skeleton className="size-8 rounded-full" />
                            <Skeleton className="size-8 rounded-full" />
                        </div>
                    </div>
                ))}

                {/* Pagination Skeleton */}
                <div className="flex h-12 items-center justify-between px-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <div className="flex gap-2">
                        <Skeleton className="size-8 rounded-full" />
                        <Skeleton className="size-8 rounded-full" />
                        <Skeleton className="size-8 rounded-full" />
                        <Skeleton className="size-8 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}