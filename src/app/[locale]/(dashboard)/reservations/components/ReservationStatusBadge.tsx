"use client";

import { cn } from "@/lib/utils";
import type { ReservationStatus } from "../types/reservations.types";

interface ReservationStatusBadgeProps {
    status: number;
    className?: string;
}

const STATUS_STYLES: Record<
    number,
    { bg: string; text: string; label: string }
> = {
    0: {
        bg: "bg-[var(--color-status-yellow-bg)]",
        text: "text-[var(--color-status-yellow-text)]",
        label: "Pending",
    },
    1: {
        bg: "bg-[var(--color-status-blue-bg)]",
        text: "text-[var(--color-status-blue-text)]",
        label: "Confirmed",
    },
    2: {
        bg: "bg-[var(--color-status-red-bg)]",
        text: "text-[var(--color-status-red-text)]",
        label: "Cancelled",
    },
    3: {
        bg: "bg-[var(--color-status-red-bg)]",
        text: "text-[var(--color-status-red-text)]",
        label: "Request Expired",
    },
    4: {
        bg: "bg-[var(--color-status-blue-bg)]",
        text: "text-[var(--color-status-blue-text)]",
        label: "On the Way",
    },
};

export function ReservationStatusBadge({
    status,
    className,
}: ReservationStatusBadgeProps) {
    const style = STATUS_STYLES[status] || STATUS_STYLES[0];

    return (
        <div
            className={cn(
                "inline-flex h-6 items-center justify-center rounded-full px-2",
                style.bg,
                className
            )}
        >
            <span
                className={cn(
                    "text-sm font-normal leading-5 tracking-tight",
                    style.text
                )}
            >
                {style.label}
            </span>
        </div>
    );
}