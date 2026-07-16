"use client";

import { useEffect } from "react";
import { LanguagePage } from "./components/LanguagePage";
import { ErrorState } from "@/components/shared/ErrorState";

interface ErrorPageProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
    useEffect(() => {
        console.error("Language page error:", error);
    }, [error]);

    return <LanguagePage />;
}