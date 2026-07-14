"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { DriverMap } from "./DriverMap";
import { DriverBottomSheet } from "./DriverBottomSheet";
import { DriverMenuDrawer } from "./DriverMenuDrawer";

export function DriverHomePage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="relative w-[414px] h-[896px] bg-white overflow-hidden rounded-[40px]">
            {/* Map View */}
            <DriverMap className="absolute inset-0" />

            {/* Menu Button (Top Left) */}
            <div className="absolute top-[59px] left-6 z-30">
                <button
                    onClick={() => setIsMenuOpen(true)}
                    className="w-14 h-14 bg-white rounded-full shadow-[0_0_24px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Open menu"
                >
                    <Menu className="w-6 h-6 text-black-100" />
                </button>
            </div>

            {/* Bottom Sheet */}
            <DriverBottomSheet className="z-20" />

            {/* Menu Drawer */}
            <DriverMenuDrawer
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
            />
        </div>
    );
}