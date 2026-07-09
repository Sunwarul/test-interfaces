"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Get in Touch page error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
            <div className="flex flex-col items-center gap-6 max-w-md text-center">
                <div className="size-16 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle className="size-8 text-red-600" />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-[24px] font-bold text-black tracking-[-0.48px]">
                        Something went wrong
                    </h1>
                    <p className="text-[16px] text-black/60 leading-6">
                        We encountered an error loading the Get in Touch page. Please try again.
                    </p>
                </div>
                <Button
                    onClick={reset}
                    className="h-12 px-8 rounded-full bg-[var(--color-brand-purple)] text-white font-bold"
                >
                    Try again
                </Button>
            </div>
        </div>
    );
}