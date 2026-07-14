"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface DriverMenuItemProps {
    label: string;
    href: string;
    isLarge?: boolean;
    className?: string;
}

export function DriverMenuItem({
    label,
    href,
    isLarge = false,
    className,
}: DriverMenuItemProps) {
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center px-6 py-2 text-black-100 transition-colors hover:bg-black-10",
                isLarge && "text-title-1-desktop",
                !isLarge && "text-body-normal",
                className
            )}
        >
            {label}
        </Link>
    );
}