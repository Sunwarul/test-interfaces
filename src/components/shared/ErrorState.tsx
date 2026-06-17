"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    className?: string;
}

export function ErrorState({
    title = "Something went wrong",
    message,
    onRetry,
    className,
}: ErrorStateProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center min-h-[300px] gap-4 ${className ?? ""}`}
        >
            <AlertTriangle className="size-8 text-destructive" />
            <div className="flex flex-col items-center gap-1 text-center">
                <p className="text-[16px] font-semibold text-[#1a1a1a]">{title}</p>
                {message && (
                    <p className="text-[13px] text-black/60 max-w-md">{message}</p>
                )}
            </div>
            {onRetry && (
                <Button variant="outline" onClick={onRetry} className="mt-2">
                    Try again
                </Button>
            )}
        </div>
    );
}