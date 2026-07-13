"use client";

import { useEffect } from "react";

export default function RequestDetailError({
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
            <div className="text-center max-w-md">
                <h2 className="text-[24px] font-bold text-black mb-2">
                    Something went wrong
                </h2>
                <p className="text-[16px] text-black/60 mb-6">
                    We couldn&apos;t load the request details. Please try again.
                </p>
                <button
                    onClick={reset}
                    className="px-6 py-3 rounded-full bg-[#6054ba] text-white font-bold"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}