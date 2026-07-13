"use client";

import { cn } from "@/lib/utils";
import { LocationMarker } from "./LocationMarker";

interface RequestMapViewProps {
    className?: string;
}

export function RequestMapView({ className }: RequestMapViewProps) {
    return (
        <div
            className={cn(
                "relative bg-white overflow-hidden",
                className
            )}
        >
            {/* Map background placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                {/* Grid pattern to simulate map */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                    }}
                />
            </div>

            {/* Navigation path overlay */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Path SVG would go here - using placeholder lines */}
                <svg
                    className="absolute left-[15%] top-[20%] w-[40%] h-[60%]"
                    viewBox="0 0 149 205"
                    fill="none"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M74.5 0C74.5 0 0 50 0 102.5C0 155 74.5 205 74.5 205"
                        stroke="#6054ba"
                        strokeWidth="3"
                        strokeDasharray="8 4"
                        fill="none"
                    />
                </svg>
                <svg
                    className="absolute right-[10%] top-[30%] w-[35%] h-[50%]"
                    viewBox="0 0 119 205"
                    fill="none"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 0C0 0 119 50 119 102.5C119 155 0 205 0 205"
                        stroke="#6054ba"
                        strokeWidth="3"
                        strokeDasharray="8 4"
                        fill="none"
                    />
                </svg>
            </div>

            {/* Location markers */}
            <div className="absolute left-[134px] top-0">
                <LocationMarker type="pickup" size="large" />
            </div>
            <div className="absolute left-[167px] bottom-0">
                <LocationMarker type="delivery" size="large" />
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <LocationMarker type="current" size="large" />
            </div>
        </div>
    );
}