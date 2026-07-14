"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHECK_ICON =
    "https://publiish.io/ipfs/Qmf8srW1r2pTr8ou8EFx1HN5PWqeMbNCc5ouuai4vbd1vt";

interface LastEarnedPopupProps {
    className?: string;
    currencySymbol?: string;
    amount?: number;
    onReferRestaurant?: () => void;
    onLater?: () => void;
}

export function LastEarnedPopup({
    className,
    currencySymbol = "₹",
    amount = 233.5,
    onReferRestaurant,
    onLater,
}: LastEarnedPopupProps) {
    const formattedAmount = `${currencySymbol}${amount.toFixed(2)}`;

    return (
        <div
            className={cn(
                "absolute left-6 right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-4 rounded-[24px] bg-white p-6 shadow-[0px_-4px_24px_rgba(0,0,0,0.2)]",
                className
            )}
        >
            {/* Check Icon */}
            <div className="relative h-10 w-10">
                <Image
                    src={CHECK_ICON}
                    alt="Success"
                    fill
                    className="object-contain"
                />
            </div>

            {/* Amount */}
            <p className="min-w-full text-center text-[40px] font-bold leading-[48px] tracking-[-1.6px] text-black">
                {formattedAmount}
            </p>

            {/* Description */}
            <div className="min-w-full text-center text-[16px] leading-6 tracking-[-0.16px] text-black">
                <p className="mb-0">Earning from last delivery order.</p>
                <p>
                    <span>Refer restaurant to </span>
                    <span className="font-medium">earn 10x</span>
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full flex-col gap-2">
                <Button
                    onClick={onReferRestaurant}
                    className="h-14 w-full rounded-full bg-[var(--color-brand-purple)] text-[20px] font-bold leading-6 tracking-[-0.2px] text-white shadow-[0px_0px_16px_rgba(96,84,186,0.4)] hover:bg-[var(--color-brand-purple)]/90"
                >
                    Refer a Restaurant
                </Button>
                <Button
                    onClick={onLater}
                    variant="outline"
                    className="h-14 w-full rounded-full border border-[var(--color-black-10)] bg-[var(--color-black-20)] text-[20px] font-bold leading-6 tracking-[-0.2px] text-black hover:bg-[var(--color-black-20)]"
                >
                    Later
                </Button>
            </div>
        </div>
    );
}