"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

const MAP_IMAGE =
    "https://publiish.io/ipfs/QmRf1jXJVbV2qJVBpyG38AHcVjh32n8rdYkhYj7U98NgKm";
const ZOOM_IN_ICON =
    "https://publiish.io/ipfs/QmcuV9BQiUmZe9bsQeoWuJKBKKDcv7oTJa2G2fY5CiaNDF";
const ZOOM_OUT_ICON =
    "https://publiish.io/ipfs/QmSfgrxZLXkDge2y8GgXR3w4Mttrym2EgqmdjnTGQGUJ9P";
const LOCATION_ICON =
    "https://publiish.io/ipfs/QmNxmAeNVks7vTLVEqXRSMsY3j2tysdThresuF9gQWaCan";

interface MapViewProps {
    className?: string;
}

export function MapView({ className }: MapViewProps) {
    return (
        <div
            className={cn(
                "relative h-full w-full overflow-hidden bg-white",
                className
            )}
        >
            {/* Map Background */}
            <div className="absolute inset-0">
                <Image
                    src={MAP_IMAGE}
                    alt="Map"
                    fill
                    className="object-cover object-[center_top]"
                    priority
                />
            </div>

            {/* Zoom Controls */}
            <div className="absolute right-6 bottom-[200px] flex flex-col gap-1">
                <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0px_0px_16px_0px_rgba(0,0,0,0.16)] border border-[rgba(0,0,0,0.1)]"
                    aria-label="Zoom in"
                >
                    <Image
                        src={ZOOM_IN_ICON}
                        alt=""
                        width={20}
                        height={20}
                    />
                </button>
                <button
                    type="button"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0px_0px_16px_0px_rgba(0,0,0,0.16)] border border-[rgba(0,0,0,0.1)]"
                    aria-label="Zoom out"
                >
                    <Image
                        src={ZOOM_OUT_ICON}
                        alt=""
                        width={20}
                        height={20}
                    />
                </button>
            </div>

            {/* Current Location Marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative h-[68px] w-[68px]">
                    <Image
                        src={LOCATION_ICON}
                        alt="Current location"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
}