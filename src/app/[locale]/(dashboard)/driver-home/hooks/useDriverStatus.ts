"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";

export type DriverStatus = "online" | "offline";

export function useDriverStatus() {
    const [status, setStatus] = useState<DriverStatus>("offline");
    const [isLoading, setIsLoading] = useState(false);

    const toggleStatus = useCallback(async () => {
        setIsLoading(true);
        try {
            // Simulate API call for status change
            // In production, this would call the actual API endpoint
            await new Promise((resolve) => setTimeout(resolve, 500));
            setStatus((prev) => {
                const newStatus = prev === "offline" ? "online" : "offline";
                toast.success(
                    newStatus === "online"
                        ? "You are now online"
                        : "You are now offline"
                );
                return newStatus;
            });
        } catch {
            toast.error("Failed to update status. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        status,
        isLoading,
        toggleStatus,
        isOnline: status === "online",
    };
}