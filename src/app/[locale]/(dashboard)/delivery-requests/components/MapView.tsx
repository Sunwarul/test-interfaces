"use client";

import { MapPin, Navigation } from "lucide-react";

interface MapViewProps {
    className?: string;
}

export function MapView({ className }: MapViewProps) {
    return (
        <div
            className={`relative w-full h-full bg-[#e8e8e8] overflow-hidden ${className ?? ""}`}
        >
            {/* Static map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8e8e8] to-[#d0d0d0]">
                {/* Map grid pattern */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="grid"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                        >
                            <path
                                d="M 40 0 L 0 0 0 40"
                                fill="none"
                                stroke="#999"
                                strokeWidth="0.5"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* Navigation path - pickup to delivery */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 400 600"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {/* Path from current location to pickup */}
                    <path
                        d="M 80 300 Q 120 280 160 260 T 200 240"
                        fill="none"
                        stroke="#6054ba"
                        strokeWidth="3"
                        strokeDasharray="8 4"
                        opacity="0.6"
                    />
                    {/* Path from pickup to delivery */}
                    <path
                        d="M 200 240 Q 240 220 280 200 T 320 180"
                        fill="none"
                        stroke="#000"
                        strokeWidth="3"
                        strokeDasharray="8 4"
                        opacity="0.6"
                    />
                </svg>
            </div>

            {/* Current Location Marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#6054ba] flex items-center justify-center shadow-lg">
                        <Navigation className="w-6 h-6 text-white" />
                    </div>
                    {/* Pulse effect */}
                    <div className="absolute inset-0 rounded-full bg-[#6054ba] animate-ping opacity-30" />
                </div>
            </div>

            {/* Pickup Marker */}
            <div className="absolute left-1/3 top-[35%] -translate-x-1/2">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#6054ba] flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                    </div>
                    {/* Pin tail */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#6054ba]" />
                </div>
            </div>

            {/* Delivery Marker */}
            <div className="absolute right-1/3 top-[65%] translate-x-1/2">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                    </div>
                    {/* Pin tail */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-black" />
                </div>
            </div>

            {/* Close button overlay */}
            <div className="absolute top-4 right-4">
                <button className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                    <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}