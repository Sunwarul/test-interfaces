"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface DriverMapProps {
    className?: string;
}

export function DriverMap({ className }: DriverMapProps) {
    const [zoom, setZoom] = useState(1);

    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));

    return (
        <div className={cn("relative w-full h-full bg-white overflow-hidden", className)}>
            {/* Map Background */}
            <div className="absolute inset-0">
                <Image
                    src="https://publiish.io/ipfs/QmRf1jXJVbV2qJVBpyG38AHcVjh32n8rdYkhYj7U98NgKm"
                    alt="Map background"
                    fill
                    className="object-cover"
                    style={{ transform: `scale(${zoom})` }}
                    priority
                />
            </div>

            {/* Current Location Marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-[67.85px] h-[67.85px]">
                    <Image
                        src="https://publiish.io/ipfs/QmYqw9BG8dtxzhGw4iUmHNmLDFJegYxvVJpUfnrvkK43mb"
                        alt="Current location"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Map Zoom Controls */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-1">
                <button
                    onClick={handleZoomIn}
                    className="w-11 h-11 bg-white rounded-full border border-black-10 shadow-[0_0_16px_rgba(0,0,0,0.16)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Zoom in"
                >
                    <Plus className="w-5 h-5 text-black-100" />
                </button>
                <button
                    onClick={handleZoomOut}
                    className="w-11 h-11 bg-white rounded-full border border-black-10 shadow-[0_0_16px_rgba(0,0,0,0.16)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Zoom out"
                >
                    <Minus className="w-5 h-5 text-black-100" />
                </button>
            </div>
        </div>
    );
}