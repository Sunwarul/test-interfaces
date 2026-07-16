"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronRight, Users, Wallet, ClipboardList, DollarSign, Gift, UserPlus, Globe, HelpCircle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { DriverMenuItem } from "./DriverMenuItem";

interface DriverMenuDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    userName?: string;
    userSubtitle?: string;
}

const menuItems = [
    { label: "Wallet", href: "/earnings", icon: Wallet },
    { label: "Orders", href: "/requests", icon: ClipboardList },
    { label: "Team Management", href: "/team", icon: Users },
    { label: "Service Price", href: "/service-price", icon: DollarSign },
];

const bottomMenuItems = [
    { label: "Add More Riders", href: "/add-rider", icon: UserPlus },
    { label: "Language", href: "/driver-home/language", icon: Globe },
    { label: "FAQ", href: "/faq", icon: HelpCircle },
    { label: "Chat with Support", href: "/support", icon: MessageCircle },
];

export function DriverMenuDrawer({
    isOpen,
    onClose,
    userName = "John Doe",
    userSubtitle = "4 Active Riders",
}: DriverMenuDrawerProps) {
    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-black-20 z-40 transition-opacity duration-300",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={cn(
                    "fixed left-0 top-0 bottom-0 w-[374px] bg-white z-50 flex flex-col justify-between pb-10 transition-transform duration-300",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Top Section */}
                <div className="flex flex-col">
                    {/* Header with Menu Button */}
                    <div className="flex items-start pt-[59px] pb-4 px-6">
                        <button
                            onClick={onClose}
                            className="w-14 h-14 bg-white rounded-full shadow-[0_0_24px_rgba(0,0,0,0.2)] flex items-center justify-center"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6 text-black-100" />
                        </button>
                    </div>

                    {/* Profile Section */}
                    <div className="flex gap-2 items-center px-6 py-4">
                        {/* Avatar */}
                        <div className="relative w-14 h-14 shrink-0">
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                                <Image
                                    src="https://publiish.io/ipfs/QmYMbto3ywiadq9zesBa97t99NKBiUdCotHEXg6gPuup43"
                                    alt="Profile photo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Status Badge */}
                            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-white rounded-full shadow-[0_0_16px_rgba(0,0,0,0.2)] flex items-center justify-center p-[5.333px]">
                                <Image
                                    src="https://publiish.io/ipfs/QmdvhsYP1foDJWb2RQCuz5Y72CUKotUS4aDw6v6TUvwCG6"
                                    alt="Status icon"
                                    width={16}
                                    height={16}
                                />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                            <h2 className="text-title-3 font-bold text-black-100 truncate">
                                {userName}
                            </h2>
                            <p className="text-caption-normal text-black-60">
                                {userSubtitle}
                            </p>
                        </div>

                        {/* Chevron */}
                        <ChevronRight className="w-6 h-6 text-black-100 shrink-0" />
                    </div>

                    {/* Menu Items */}
                    <nav className="flex flex-col">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center px-6 py-2 text-title-1-desktop font-bold text-black-100 hover:bg-black-10 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Section Header */}
                        <div className="px-6 py-2">
                            <span className="text-title-1-desktop font-bold text-black-100">
                                Earn By Referring
                            </span>
                        </div>
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col">
                    {bottomMenuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-2 px-6 py-2 text-body-normal text-black-100 hover:bg-black-10 transition-colors"
                        >
                            <item.icon className="w-6 h-6" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}