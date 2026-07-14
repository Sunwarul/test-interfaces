"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface OfflineSheetProps {
    className?: string;
    onGoToggle?: (isOnline: boolean) => void;
}

export function OfflineSheet({ className, onGoToggle }: OfflineSheetProps) {
    const [isOnline, setIsOnline] = useState(false);

    const handleGoClick = () => {
        const newState = !isOnline;
        setIsOnline(newState);
        onGoToggle?.(newState);
    };

    return (
        <div
            className={cn(
                "absolute bottom-0 left-0 right-0 flex items-center justify-between rounded-tl-[32px] rounded-tr-[32px] bg-white px-6 pb-[34px] pt-6 shadow-[0px_-4px_24px_rgba(0,0,0,0.2)]",
                className
            )}
        >
            {/* Title & Subtitle */}
            <div className="flex flex-col gap-1">
                <p className="text-[20px] font-bold leading-6 tracking-[-0.2px] text-black">
                    You are Offline!
                </p>
                <p className="text-[13px] font-normal leading-4 text-black/60">
                    Go online to start receiving orders
                </p>
            </div>

            {/* Bottom Sheet Handle */}
            <div className="absolute left-1/2 top-2 h-1.5 w-[100px] -translate-x-1/2 rounded-full bg-black/10" />

            {/* GO Button */}
            <button
                type="button"
                onClick={handleGoClick}
                className={cn(
                    "relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-purple)] shadow-[0px_0px_16px_rgba(96,84,186,0.4)] transition-all"
                )}
                aria-label={isOnline ? "Go offline" : "Go online"}
            >
                {/* Shadow effect */}
                <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-brand-purple)]/40" />
                <span className="text-[20px] font-bold leading-6 tracking-[-0.2px] text-white">
                    GO
                </span>
            </button>
        </div>
    );
}