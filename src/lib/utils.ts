import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Normalize an enum object (key-value pairs) into an array of { value, label }.
 * Handles both string-keyed and numeric-keyed enums.
 */
export function normalizeEnum<T extends string>(
    raw: Record<string, T> | undefined
): Array<{ value: T; label: string }> {
    if (!raw || typeof raw !== "object") return [];
    return Object.entries(raw).map(([key, value]) => ({
        value,
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
    }));
}

/**
 * Safe array access — returns fallback if value is not an array.
 */
export function safeArray<T>(value: unknown, fallback: T[] = []): T[] {
    if (Array.isArray(value)) return value as T[];
    if (value !== null && typeof value === "object")
        return Object.values(value as object) as T[];
    return fallback;
}

/**
 * Format a date string for display.
 */
export function formatDate(dateStr: string | null | undefined): string {
    if (!dateStr) return "—";
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    } catch {
        return dateStr;
    }
}

/**
 * Format time string for display (e.g., "14:00" → "2:00 PM").
 */
export function formatTime(timeStr: string | null | undefined): string {
    if (!timeStr) return "—";
    try {
        const [hours, minutes] = timeStr.split(":").map(Number);
        const date = new Date();
        date.setHours(hours, minutes);
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    } catch {
        return timeStr;
    }
}