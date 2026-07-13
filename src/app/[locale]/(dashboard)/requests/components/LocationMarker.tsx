"use client";

import { cn } from "@/lib/utils";

interface LocationMarkerProps {
    type: "pickup" | "delivery" | "current";
    size?: "small" | "large";
    className?: string;
}

export function LocationMarker({
    type,
    size = "small",
    className,
}: LocationMarkerProps) {
    const isSmall = size === "small";
    const isPickup = type === "pickup";
    const isDelivery = type === "delivery";
    const isCurrent = type === "current";

    if (isCurrent) {
        return (
            <div
                className={cn(
                    "relative flex items-center justify-center",
                    isSmall ? "size-[48px]" : "size-[67px]",
                    className
                )}
            >
                {/* Current location marker - circular with crosshair */}
                <div className="absolute inset-0 rounded-full bg-[#6054ba] opacity-20" />
                <div className="absolute inset-[8%] rounded-full bg-[#6054ba]" />
                <div className="absolute inset-[25%] rounded-full bg-[#6054ba]" />
            </div>
        );
    }

    if (isSmall) {
        return (
            <div
                className={cn(
                    "relative rounded-full shrink-0 size-6",
                    isPickup ? "bg-[#6054ba]" : "bg-black",
                    className
                )}
            >
                {/* Icon placeholder - step out/in arrows */}
                <div className="absolute left-[4px] top-[4px] size-5">
                    {isPickup ? (
                        <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            className="size-full text-white"
                        >
                            <path
                                d="M10 4L6 8h3v4H7l3 4 3-4h-2V8h3l-4-4z"
                                fill="currentColor"
                            />
                        </svg>
                    ) : (
                        <svg
                            viewBox="0 0 20 20"
                            fill="none"
                            className="size-full text-white"
                        >
                            <path
                                d="M10 16L6 12h3V8H7l3-4 3 4h-2v4h3l-4 4z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                </div>
            </div>
        );
    }

    // Large marker
    return (
        <div
            className={cn(
                "relative flex flex-col items-center gap-1",
                className
            )}
        >
            {/* Marker body */}
            <div
                className={cn(
                    "flex items-center justify-center rounded-full shrink-0",
                    isPickup
                        ? "bg-[#6054ba] size-10"
                        : "bg-black size-10 -scale-y-100",
                    !isPickup && "rotate-180"
                )}
            >
                <div className="size-8">
                    {isPickup ? (
                        <svg
                            viewBox="0 0 32 32"
                            fill="none"
                            className="size-full text-white"
                        >
                            <path
                                d="M16 6L8 14h5v8h6v-8h5l-8-8z"
                                fill="currentColor"
                            />
                        </svg>
                    ) : (
                        <svg
                            viewBox="0 0 32 32"
                            fill="none"
                            className="size-full text-white"
                        >
                            <path
                                d="M16 26L8 18h5v-8h6v8h5l-8 8z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                </div>
            </div>
            {/* Pin */}
            <div className="relative shrink-0 size-2">
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        isPickup ? "bg-[#6054ba]" : "bg-black"
                    )}
                />
            </div>
        </div>
    );
}