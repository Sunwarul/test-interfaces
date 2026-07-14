"use client";

import { useState } from "react";
import { useLastEarned } from "../hooks/useLastEarned";
import { MapView } from "./MapView";
import { HeaderBar } from "./HeaderBar";
import { OfflineSheet } from "./OfflineSheet";
import { LastEarnedPopup } from "./LastEarnedPopup";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LastEarnedPageProps {
    recordId: string;
    className?: string;
}

export function LastEarnedPage({ recordId, className }: LastEarnedPageProps) {
    const [showPopup, setShowPopup] = useState(true);
    const { data, isLoading, isError, refetch } = useLastEarned(recordId);

    const earnings = data?.data?.item;
    const currencySymbol = earnings?.currencySymbol ?? "₹";
    const grantTotal = earnings?.grantTotal ?? 233.5;

    const handleReferRestaurant = () => {
        // Navigate to restaurant referral screen
        console.log("Navigate to refer restaurant");
    };

    const handleLater = () => {
        setShowPopup(false);
    };

    return (
        <div
            className={cn(
                "relative h-[896px] w-[414px] overflow-hidden rounded-[40px] bg-white",
                className
            )}
        >
            {/* Map Background */}
            <MapView className="absolute inset-0" />

            {/* Header Bar */}
            <HeaderBar className="absolute left-0 right-0 top-0 z-10" />

            {/* Overlay */}
            {showPopup && (
                <div className="absolute inset-0 z-[5] bg-black/20" />
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/80">
                    <div className="flex flex-col items-center gap-4">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <Skeleton className="h-8 w-32" />
                        <Skeleton className="h-20 w-64" />
                    </div>
                </div>
            )}

            {/* Error State */}
            {isError && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/80">
                    <div className="flex flex-col items-center gap-4 p-6">
                        <p className="text-[16px] text-black/60">
                            Failed to load earnings data
                        </p>
                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="rounded-full bg-[#6054ba] px-6 py-3 text-[16px] font-bold text-white"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            )}

            {/* Last Earned Popup */}
            {showPopup && !isLoading && !isError && (
                <LastEarnedPopup
                    currencySymbol={currencySymbol}
                    amount={grantTotal}
                    onReferRestaurant={handleReferRestaurant}
                    onLater={handleLater}
                />
            )}

            {/* Offline Sheet */}
            <OfflineSheet className="absolute left-0 right-0 bottom-0 z-10" />
        </div>
    );
}