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
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <div className="text-center space-y-4">
                <h2 className="text-[24px] font-bold text-black tracking-[-0.48px]">
                    Something went wrong!
                </h2>
                <p className="text-[16px] text-black/60">
                    We couldn&apos;t load the referral information. Please try again.
                </p>
                <Button
                    onClick={reset}
                    className="bg-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple)]/90 text-white rounded-full px-8"
                >
                    Try again
                </Button>
            </div>
        </div>
    );
}