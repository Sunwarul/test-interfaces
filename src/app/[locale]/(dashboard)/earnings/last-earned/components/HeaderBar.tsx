"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const MENU_ICON =
    "https://publiish.io/ipfs/QmRfYuPeTXvigmM4kJuGzdgRH7kSwst8C1rJFypMaL7gHq";
const PROFILE_PHOTO =
    "https://publiish.io/ipfs/QmYMbto3ywiadq9zesBa97t99NKBiUdCotHEXg6gPuup43";

interface HeaderBarProps {
    className?: string;
    todayEarnings?: string;
    driverRating?: string;
    onMenuClick?: () => void;
    onProfileClick?: () => void;
}

export function HeaderBar({
    className,
    todayEarnings = "₹2568.50",
    driverRating = "4.8",
    onMenuClick,
    onProfileClick,
}: HeaderBarProps) {
    return (
        <div
            className={cn(
                "absolute left-0 right-0 top-0 flex h-[130px] items-start justify-between px-6 pt-[59px]",
                className
            )}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent" />

            {/* Menu Button */}
            <button
                type="button"
                onClick={onMenuClick}
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-[32px] bg-white shadow-[0px_0px_24px_rgba(0,0,0,0.2)]"
                aria-label="Open menu"
            >
                <Image src={MENU_ICON} alt="" width={24} height={24} />
            </button>

            {/* Today's Earnings */}
            <div className="relative z-10 flex h-14 flex-col items-center justify-center rounded-[80px] bg-black px-6">
                <span className="text-[13px] font-normal leading-4 text-white/60">
                    Today
                </span>
                <span className="text-[20px] font-bold leading-6 tracking-[-0.2px] text-white">
                    {todayEarnings}
                </span>
            </div>

            {/* Profile with Rating */}
            <button
                type="button"
                onClick={onProfileClick}
                className="relative z-10 flex flex-col items-center"
                aria-label="View profile"
            >
                <div className="relative mb-[-8px] h-14 w-14">
                    <Image
                        src={PROFILE_PHOTO}
                        alt="Profile"
                        fill
                        className="rounded-[52px] object-cover"
                    />
                </div>
                {/* Driver Rating Badge */}
                <div className="flex h-[32px] w-[32px] items-start justify-center rounded-[18px] border border-white bg-[var(--color-brand-yellow)]">
                    <span className="text-[13px] font-bold leading-4 text-black">
                        {driverRating}
                    </span>
                </div>
            </button>
        </div>
    );
}