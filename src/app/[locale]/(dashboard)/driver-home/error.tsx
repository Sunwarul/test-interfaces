"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className="relative w-[414px] h-[896px] bg-white overflow-hidden rounded-[40px] flex flex-col items-center justify-center p-6">
            <div className="flex flex-col items-center gap-4 max-w-[300px] text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <h2 className="text-headline font-bold text-black-100">
                    Something went wrong
                </h2>
                <p className="text-body-normal text-black-60">
                    {error.message || "An unexpected error occurred"}
                </p>
                <Button
                    onClick={reset}
                    className="mt-4 h-12 px-8 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-full"
                >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Try again
                </Button>
            </div>
        </div>
    );
}