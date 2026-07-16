"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/shared/ErrorState";

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error("Language page error:", error);
    }, [error]);

    return (
        <div className="relative w-[414px] h-[896px] bg-white overflow-hidden rounded-[40px] flex flex-col">
            <ErrorState onRetry={reset} />
        </div>
    );
}