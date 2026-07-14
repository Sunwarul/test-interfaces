"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-6">
            <AlertTriangle className="w-12 h-12 text-destructive" />
            <h2 className="text-headline font-bold text-black-100">
                Something went wrong
            </h2>
            <p className="text-body-normal text-black-60 text-center">
                {error.message || "An unexpected error occurred"}
            </p>
            <Button onClick={reset} className="mt-2">
                Try again
            </Button>
        </div>
    );
}