"use client";

import { Button } from "@/components/ui/button";
import { VideoThumbnail } from "./VideoThumbnail";
import { StatWidget } from "./StatWidget";

interface BottomSheetCardProps {
    commissionEarned: number;
    referrals: number;
    currencySymbol?: string;
    onShowQRCode?: () => void;
    onPlayVideo?: () => void;
}

export function BottomSheetCard({
    commissionEarned,
    referrals,
    currencySymbol = "₹",
    onShowQRCode,
    onPlayVideo,
}: BottomSheetCardProps) {
    return (
        <div className="absolute bg-white left-4 right-4 rounded-[32px] shadow-[0px_-4px_48px_0px_rgba(0,0,0,0.2)] top-[130px]">
            {/* Header */}
            <div className="bg-white p-6 rounded-tl-[32px] rounded-tr-[32px]">
                <h2 className="text-[24px] font-bold leading-8 text-black tracking-[-0.48px] flex-1 min-w-px">
                    Increase Your Earnings by Referring Restaurants
                </h2>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4 px-6 pb-6">
                {/* Description */}
                <p className="text-[16px] font-normal leading-6 text-black/60 tracking-[-0.16px]">
                    Show your QR code to the restaurant for them to scan and
                    earn a ₹100 commission when they sign up!
                </p>

                {/* Video thumbnail */}
                <VideoThumbnail onPlayClick={onPlayVideo} />

                {/* Show QR Code button */}
                <Button
                    className="bg-[var(--color-brand-purple)] hover:bg-[var(--color-brand-purple)]/90 h-12 rounded-full w-full text-[20px] font-bold leading-6 text-white tracking-[-0.2px]"
                    onClick={onShowQRCode}
                >
                    Show QR Code
                </Button>

                {/* Stats row */}
                <div className="flex gap-2">
                    <StatWidget
                        type="commission"
                        value={`${currencySymbol}${commissionEarned.toFixed(2)}`}
                    />
                    <StatWidget type="referrals" value={referrals} />
                </div>
            </div>
        </div>
    );
}