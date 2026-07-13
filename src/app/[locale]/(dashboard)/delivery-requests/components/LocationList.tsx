"use client";

import { MapPin, Navigation } from "lucide-react";

interface LocationItemProps {
    type: "pickup" | "delivery";
    distance: string;
    eta: string;
    address: string;
    isFirst?: boolean;
}

export function LocationItem({
    type,
    distance,
    eta,
    address,
    isFirst = false,
}: LocationItemProps) {
    const isPickup = type === "pickup";
    const markerBgClass = isPickup ? "bg-[#6054ba]" : "bg-black";
    const Icon = isPickup ? MapPin : Navigation;

    return (
        <div className="flex gap-3 items-start pb-6">
            {/* Dash divider line */}
            {isFirst && (
                <div className="absolute left-[26px] top-[46px] bottom-0 w-5">
                    <div className="w-full h-full border-l-2 border-dashed border-black/20" />
                </div>
            )}

            {/* Marker */}
            <div className={`relative w-6 h-6 rounded-full ${markerBgClass} flex items-center justify-center shrink-0 z-10`}>
                <Icon className="w-4 h-4 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                {/* ETA row */}
                <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center h-5 px-2 rounded-full text-[13px] font-bold bg-black/10 text-black">
                        {distance}
                    </span>
                    <span className="text-[13px] text-black">
                        ~ {eta}
                    </span>
                </div>

                {/* Address */}
                <p className="text-[16px] text-black tracking-[-0.16px] leading-6 break-words">
                    {address || "—"}
                </p>
            </div>
        </div>
    );
}

interface LocationListProps {
    pickupAddress: string;
    deliveryAddress: string;
    pickupDistance?: string;
    deliveryDistance?: string;
    pickupEta?: string;
    deliveryEta?: string;
    className?: string;
}

export function LocationList({
    pickupAddress,
    deliveryAddress,
    pickupDistance = "0.6 km away",
    deliveryDistance = "2.6 km trip",
    pickupEta = "2min",
    deliveryEta = "16min",
    className,
}: LocationListProps) {
    return (
        <div className={`flex flex-col ${className ?? ""}`}>
            <LocationItem
                type="pickup"
                distance={pickupDistance}
                eta={pickupEta}
                address={pickupAddress}
                isFirst
            />
            <LocationItem
                type="delivery"
                distance={deliveryDistance}
                eta={deliveryEta}
                address={deliveryAddress}
            />
        </div>
    );
}