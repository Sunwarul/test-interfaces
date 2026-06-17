"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

interface EmptyStateProps {
    title?: string;
    description?: string;
    cta?: {
        label: string;
        href?: string;
        onClick?: () => void;
    };
    action?: {
        label: string;
        onClick: () => void;
    };
    className?: string;
}

export function EmptyState({
    title = "No results found",
    description,
    cta,
    action,
    className,
}: EmptyStateProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center min-h-[300px] gap-2 ${className ?? ""}`}
        >
            <p className="text-[16px] font-normal text-[#1a1a1a] tracking-[-0.16px]">
                {title}
            </p>
            {description && (
                <p className="text-[13px] text-black/60">{description}</p>
            )}
            {cta && (
                <Link href={cta.href ?? "#"}>
                    <Button variant="link" className="text-[16px] underline">
                        {cta.label}
                    </Button>
                </Link>
            )}
            {action && (
                <Button
                    variant="link"
                    className="text-[16px] underline"
                    onClick={action.onClick}
                >
                    {action.label}
                </Button>
            )}
        </div>
    );
}