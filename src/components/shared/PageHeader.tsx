"use client";

import { Link } from "@/i18n/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
    title: string;
    backHref?: string;
    actions?: React.ReactNode;
    className?: string;
}

export function PageHeader({
    title,
    backHref,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <div
            className={`flex items-center justify-between pb-6 px-6 ${className ?? ""}`}
        >
            <div className="flex items-center gap-4">
                {backHref && (
                    <Link href={backHref}>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full"
                        >
                            <ChevronLeft className="size-5" />
                        </Button>
                    </Link>
                )}
                <h1 className="text-[32px] font-bold text-[#1a1a1a] tracking-[-0.96px] leading-10">
                    {title}
                </h1>
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
    );
}