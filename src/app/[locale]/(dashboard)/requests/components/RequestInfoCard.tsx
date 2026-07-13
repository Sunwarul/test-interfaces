"use client";

import { cn } from "@/lib/utils";

interface RequestInfoCardProps {
    price: string;
    currency: string;
    paymentMethod: string;
    paymentStatus: string;
    distance: string;
    className?: string;
}

export function RequestInfoCard({
    price,
    currency,
    paymentMethod,
    paymentStatus,
    distance,
    className,
}: RequestInfoCardProps) {
    const isPaid = paymentStatus.toLowerCase() === "paid";

    return (
        <div className={cn("flex flex-col gap-1", className)}>
            {/* Price and Payment Method */}
            <div className="flex items-center gap-2">
                <p className="text-[32px] font-bold tracking-[-0.96px] leading-10 text-black">
                    {currency}
                    {price}
                </p>
                <div
                    className={cn(
                        "flex items-center h-5 px-2 rounded-full text-[13px] font-bold leading-4",
                        isPaid
                            ? "bg-[rgba(76,175,80,0.2)] text-[#4caf50]"
                            : "bg-black text-white"
                    )}
                >
                    {paymentMethod}
                </div>
            </div>
            {/* Distance */}
            <p className="text-[13px] font-normal leading-4 text-black/60">
                {distance} in total
            </p>
        </div>
    );
}