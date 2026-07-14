"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-white px-6">
            <AlertTriangle className="h-12 w-12 text-[#6054ba]" />
            <div className="flex flex-col items-center gap-2 text-center">
                <h2 className="text-[20px] font-bold leading-6 tracking-[-0.2px] text-black">
                    Something went wrong
                </h2>
                <p className="text-[16px] leading-6 text-black/60">
                    {error.message || "Failed to load earnings data"}
                </p>
            </div>
            <Button
                onClick={reset}
                className="h-12 rounded-full bg-[#6054ba] px-8 text-[16px] font-bold text-white hover:bg-[#6054ba]/90"
            >
                Try again
            </Button>
        </div>
    );
}