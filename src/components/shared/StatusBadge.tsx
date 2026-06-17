"use client";

import { cn } from "@/lib/utils";

type StatusVariant =
    | "pending"
    | "confirmed"
    | "cancelled"
    | "request_expired"
    | "active"
    | "inactive"
    | "default";

const statusStyles: Record<StatusVariant, string> = {
    pending: "bg-[#fcf3cc] text-[#957c1c]",
    confirmed: "bg-[#d1e2fb] text-[#1870eb]",
    cancelled: "bg-[#f9cfcf] text-[#e10e0e]",
    request_expired: "bg-[#f9cfcf] text-[#e10e0e]",
    active: "bg-[#d1e2fb] text-[#1870eb]",
    inactive: "bg-[#f9cfcf] text-[#e10e0e]",
    default: "bg-muted text-muted-foreground",
};

interface StatusBadgeProps {
    variant?: StatusVariant;
    children: React.ReactNode;
    className?: string;
}

export function StatusBadge({
    variant = "default",
    children,
    className,
}: StatusBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center h-6 px-2 text-[13px] rounded-full font-normal",
                statusStyles[variant],
                className
            )}
        >
            {children}
        </span>
    );
}