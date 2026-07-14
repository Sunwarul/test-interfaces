"use client";

import { useState, useCallback } from "react";

export type DriverStatus = "online" | "offline";

export function useDriverStatus() {
    const [status, setStatus] = useState<DriverStatus>("offline");
    const [isLoading, setIsLoading] = useState(false);

    const toggleStatus = useCallback(async () => {
        setIsLoading(true);
        // Simulate API call for status change
        // In production, this would call the actual API
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStatus((prev) => (prev === "offline" ? "online" : "offline"));
        setIsLoading(false);
    }, []);

    return {
        status,
        isLoading,
        toggleStatus,
        isOnline: status === "online",
    };
}