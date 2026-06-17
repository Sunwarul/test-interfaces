"use client";

import { useEffect } from "react";

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
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-6">
            <div className="text-center">
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">
                    Something went wrong
                </h2>
                <p className="text-[13px] text-black/60 mb-4">
                    {error.message || "An unexpected error occurred"}
                </p>
                <button
                    onClick={reset}
                    className="px-4 py-2 bg-[#1a1a1a] text-white rounded-full text-[14px] font-bold hover:bg-[#1a1a1a]/90 transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}