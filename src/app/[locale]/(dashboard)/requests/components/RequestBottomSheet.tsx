"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RequestInfoCard } from "./RequestInfoCard";
import { RequestLocationsList } from "./RequestLocationsList";
import type { LocationData } from "../types/requests.types";

interface RequestBottomSheetProps {
    price: string;
    currency: string;
    paymentMethod: string;
    paymentStatus: string;
    distance: string;
    locations: LocationData[];
    onAccept?: () => void;
    isAccepting?: boolean;
    className?: string;
}

export function RequestBottomSheet({
    price,
    currency,
    paymentMethod,
    paymentStatus,
    distance,
    locations,
    onAccept,
    isAccepting,
    className,
}: RequestBottomSheetProps) {
    return (
        <div
            className={cn(
                "flex flex-col bg-white rounded-t-[32px] shadow-[-4px_0_24px_rgba(0,0,0,0.2)]",
                className
            )}
        >
            {/* Request Info Card */}
            <div className="px-6 pt-6 pb-4">
                <RequestInfoCard
                    price={price}
                    currency={currency}
                    paymentMethod={paymentMethod}
                    paymentStatus={paymentStatus}
                    distance={distance}
                />
            </div>

            {/* Locations List */}
            <div className="px-6 pb-6">
                <RequestLocationsList locations={locations} />
            </div>

            {/* Accept Button */}
            <div className="px-6 pb-8 pt-4">
                <Button
                    onClick={onAccept}
                    disabled={isAccepting}
                    className={cn(
                        "w-full h-14 rounded-[32px] bg-[#6054ba] text-white text-[20px] font-bold leading-6 tracking-[-0.2px]",
                        "hover:bg-[#4a3f9e] disabled:opacity-50",
                        "shadow-[0_0_48px_rgba(0,0,0,0.2)]"
                    )}
                >
                    {isAccepting ? (
                        <span className="flex items-center gap-2">
                            <span className="size-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            Accepting...
                        </span>
                    ) : (
                        "Accept Order"
                    )}
                </Button>
            </div>
        </div>
    );
}