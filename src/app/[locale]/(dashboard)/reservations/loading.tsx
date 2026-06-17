export default function Loading() {
    return (
        <div className="flex flex-col gap-6 p-6">
            {/* Title skeleton */}
            <div className="h-10 w-48 bg-black/5 rounded animate-pulse" />

            {/* Card skeleton */}
            <div className="rounded-2xl border border-black/10 bg-white/60 p-0 overflow-hidden">
                {/* Filters skeleton */}
                <div className="h-14 border-b border-black/10 flex items-center px-6 gap-4">
                    <div className="h-8 w-[200px] bg-black/5 rounded animate-pulse" />
                    <div className="h-8 w-[160px] bg-black/5 rounded animate-pulse" />
                    <div className="h-8 w-[160px] bg-black/5 rounded animate-pulse" />
                    <div className="ml-auto h-10 w-[180px] bg-black/5 rounded-full animate-pulse" />
                </div>

                {/* Table skeleton */}
                <div className="p-6 space-y-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-16 bg-black/5 rounded animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
}