"use client";

export default function Loading() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header skeleton */}
            <div className="bg-white flex gap-6 items-start pb-4 pl-2 pr-6 pt-[59px] relative w-full">
                <div className="size-14 rounded-full bg-black/5 animate-pulse shrink-0" />
                <div className="flex-1 h-8 bg-black/5 rounded-lg animate-pulse min-w-px" />
                <div className="size-14 rounded-full bg-black/5 animate-pulse shrink-0" />
            </div>

            {/* Content skeleton */}
            <div className="flex flex-col gap-6 px-6">
                {/* FAQ text skeleton */}
                <div className="h-6 bg-black/5 rounded-lg animate-pulse w-3/4" />

                {/* Form skeleton */}
                <div className="flex flex-col gap-4">
                    {/* Tabs skeleton */}
                    <div className="flex gap-1">
                        <div className="flex-1 h-8 bg-black/5 rounded-full animate-pulse" />
                        <div className="flex-1 h-8 bg-black/5 rounded-full animate-pulse" />
                        <div className="flex-1 h-8 bg-black/5 rounded-full animate-pulse" />
                    </div>
                    {/* Textarea skeleton */}
                    <div className="min-h-[120px] bg-black/5 rounded-3xl animate-pulse" />
                    {/* Button skeleton */}
                    <div className="h-14 bg-black/5 rounded-full animate-pulse" />
                </div>
            </div>

            {/* Contact Details skeleton */}
            <div className="flex flex-col items-start pt-10">
                <div className="h-6 bg-black/5 rounded-lg animate-pulse w-40 mb-4 px-6" />
                <div className="w-full">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-2 items-center p-6 border-b border-black/10">
                            <div className="size-8 bg-black/5 rounded-full animate-pulse shrink-0" />
                            <div className="flex-1 flex flex-col gap-2">
                                <div className="h-5 bg-black/5 rounded animate-pulse w-32" />
                                <div className="h-4 bg-black/5 rounded animate-pulse w-24" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}