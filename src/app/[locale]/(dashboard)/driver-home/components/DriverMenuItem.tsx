"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DriverMenuItemProps {
    label: string;
    href: string;
    icon?: LucideIcon;
    isLarge?: boolean;
    className?: string;
}

export function DriverMenuItem({
    label,
    href,
    icon: Icon,
    isLarge = false,
    className,
}: DriverMenuItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center gap-2 px-6 py-2 text-black-100 transition-colors hover:bg-black-10",
                isLarge ? "text-title-1-desktop font-bold" : "text-body-normal",
                className
            )}
        >
            {Icon && <Icon className="w-6 h-6 shrink-0" />}
            {label}
        </Link>
    );
}