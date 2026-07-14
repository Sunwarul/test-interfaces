"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OfflineFooterProps {
    isOnline?: boolean;
    onGoOnline?: () => void;
    isLoading?: boolean;
}

export function OfflineFooter({
    isOnline = false,
    onGoOnline,
    isLoading = false,
}: OfflineFooterProps) {
    return (
        <div className="absolute bottom-0 left-0 right-0 bg-white drop-shadow-[0px_-4px_24px_rgba(0,0,0,0.2)] rounded-tl-[32px] rounded-tr-[32px] px-6 pb-[34px] pt-6 flex items-center justify-between">
            <div className="flex flex-col gap-1 flex-1 min-w-px">
                <p className="text-[20px] font-bold leading-6 text-black tracking-[-0.2px]">
                    You are Offline!
                </p>
                <p className="text-[13px] font-normal leading-4 text-black/60">
                    Go online to start receiving orders
                </p>
            </div>

            {/* Drag handle indicator */}
            <div className="absolute -translate-x-1/2 bg-black/10 h-[6px] left-1/2 rounded-[17px] top-2 w-[100px]" />

            {/* GO Button */}
            <Button
                size="icon"
                className="bg-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple)]/90 rounded-[58.182px] size-16 shrink-0 drop-shadow-[0px_0px_16px_rgba(96,84,186,0.4)]"
                disabled={isLoading}
                onClick={onGoOnline}
                aria-label="Go online"
            >
                {isLoading ? (
                    <Loader2 className="size-6 animate-spin text-white" />
                ) : (
                    <span className="text-[20px] font-bold text-white tracking-[-0.2px]">
                        GO
                    </span>
                )}
            </Button>
        </div>
    );
}