"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDriverStatus } from "../hooks/useDriverStatus";

interface DriverBottomSheetProps {
    className?: string;
}

export function DriverBottomSheet({ className }: DriverBottomSheetProps) {
    const { status, isLoading, toggleStatus, isOnline } = useDriverStatus();

    return (
        <div
            className={cn(
                "absolute bottom-0 left-0 right-0 bg-white rounded-tl-[32px] rounded-tr-[32px] shadow-[0_-4px_24px_rgba(0,0,0,0.2)] flex items-center justify-between px-6 pt-6 pb-10",
                className
            )}
        >
            {/* Status Text */}
            <div className="flex flex-col gap-1">
                <h3 className="text-headline font-bold text-black-100">
                    {isOnline ? "You are Online!" : "You are Offline!"}
                </h3>
                <p className="text-caption-normal text-black-60">
                    {isOnline
                        ? "You are currently receiving orders"
                        : "Go online to start receiving orders"}
                </p>
            </div>

            {/* GO Button */}
            <button
                onClick={toggleStatus}
                disabled={isLoading}
                className={cn(
                    "relative w-16 h-16 bg-brand-purple rounded-full flex items-center justify-center shadow-[0_0_16px_rgba(96,84,186,0.4)] transition-transform active:scale-95",
                    isLoading && "opacity-70"
                )}
                aria-label={isOnline ? "Go offline" : "Go online"}
            >
                {/* Shadow Effect */}
                <div className="absolute inset-0 bg-brand-purple/40 rounded-full" />

                {/* Button Content */}
                {isLoading ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin relative z-10" />
                ) : (
                    <span className="text-button-large font-bold text-white relative z-10">
                        GO
                    </span>
                )}
            </button>

            {/* Bottom Sheet Handle */}
            <div className="absolute -translate-x-1/2 left-[calc(50%+0.5px)] top-2">
                <div className="w-[100px] h-1.5 bg-black-10 rounded-full" />
            </div>
        </div>
    );
}