"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-6 py-16">
            <div className="flex size-16 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="size-8 text-red-600" />
            </div>
            <div className="text-center">
                <h2 className="text-xl font-bold text-[var(--color-text-black-100)]">
                    Something went wrong!
                </h2>
                <p className="mt-2 text-sm text-[var(--color-text-black-60)]">
                    {error.message || "An unexpected error occurred"}
                </p>
            </div>
            <Button
                onClick={reset}
                className="h-10 rounded-full bg-black px-6 text-sm font-bold text-white hover:bg-gray-800"
            >
                Try again
            </Button>
        </div>
    );
}