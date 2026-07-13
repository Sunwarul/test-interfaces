"use client";

import { cn } from "@/lib/utils";
import { LocationMarker } from "./LocationMarker";
import type { LocationData } from "../types/requests.types";

interface RequestLocationsListProps {
    locations: LocationData[];
    className?: string;
}

export function RequestLocationsList({
    locations,
    className,
}: RequestLocationsListProps) {
    return (
        <div className={cn("flex flex-col", className)}>
            {locations.map((location, index) => {
                const isLast = index === locations.length - 1;
                const isPickup = location.type === "pickup";
                const isDelivery = location.type === "delivery";

                return (
                    <div
                        key={`${location.type}-${index}`}
                        className={cn(
                            "flex gap-2 items-start pb-6",
                            isLast && "pb-0"
                        )}
                    >
                        {/* Dash divider line */}
                        {!isLast && (
                            <div className="absolute left-[26px] top-[46px] bottom-0 w-5">
                                <div className="w-full h-full border-l-2 border-dashed border-black/20" />
                            </div>
                        )}

                        {/* Marker */}
                        <LocationMarker type={location.type} size="small" />

                        {/* Content */}
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                            {/* ETA */}
                            <div className="flex items-center gap-2 min-h-6">
                                {location.distance && (
                                    <div className="flex items-center h-5 px-2 rounded-full bg-black/10 text-[13px] font-bold leading-4 text-black">
                                        {location.distance}
                                    </div>
                                )}
                                {location.tripDistance && (
                                    <div className="flex items-center h-5 px-2 rounded-full bg-black/10 text-[13px] font-bold leading-4 text-black">
                                        {location.tripDistance}
                                    </div>
                                )}
                                {location.eta && (
                                    <p className="text-[13px] font-normal leading-4 text-black">
                                        ~ {location.eta}
                                    </p>
                                )}
                            </div>

                            {/* Address */}
                            <p className="text-[16px] font-normal leading-6 tracking-[-0.16px] text-black">
                                {location.address}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}