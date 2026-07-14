"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm">
        <div className="size-16 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="size-8 text-red-500" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-headline text-black">Something went wrong</h1>
          <p className="text-body-normal text-[rgba(0,0,0,0.6)]">
            {error.message || "An unexpected error occurred. Please try again."}
          </p>
        </div>

        <Button
          onClick={reset}
          className="h-12 px-6 rounded-full bg-[var(--color-brand-purple)] text-white hover:bg-[var(--color-brand-purple)]/90"
        >
          <RefreshCw className="size-5 mr-2" />
          Try again
        </Button>
      </div>
    </div>
  );
}