"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-6">
            <div className="text-center space-y-4">
                <h2 className="text-[24px] font-bold text-black">
                    Something went wrong
                </h2>
                <p className="text-[16px] text-black/60">
                    We couldn&apos;t load this delivery request. Please try again.
                </p>
                <Button
                    onClick={reset}
                    className="h-12 px-6 rounded-full bg-[#6054ba] hover:bg-[#4a3f9e] text-white"
                >
                    Try again
                </Button>
            </div>
        </div>
    );
}