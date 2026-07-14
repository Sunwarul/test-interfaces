"use client";

import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
    todayEarnings?: string;
    userName?: string;
    userAvatar?: string;
    userRating?: number;
    onMenuClick?: () => void;
    onProfileClick?: () => void;
    onNotificationsClick?: () => void;
}

export function ProfileHeader({
    todayEarnings = "₹0.00",
    userName,
    userAvatar,
    userRating,
    onMenuClick,
    onProfileClick,
    onNotificationsClick,
}: ProfileHeaderProps) {
    return (
        <div className="absolute flex h-[130px] items-start justify-between left-0 pt-[59px] px-6 right-0 top-0 w-full">
            {/* Gradient overlay */}
            <div className="absolute bg-gradient-to-b from-white h-[130px] left-0 right-0 to-white/0 top-0" />

            {/* Menu button */}
            <Button
                variant="ghost"
                size="icon"
                className="bg-white cursor-pointer drop-shadow-[0px_0px_24px_rgba(0,0,0,0.2)] rounded-[32px] size-14 shrink-0 z-10"
                onClick={onMenuClick}
                aria-label="Open menu"
            >
                <Menu className="size-6" />
            </Button>

            {/* Today's earnings */}
            <div className="bg-black flex flex-col h-14 items-center justify-center px-6 py-2 rounded-[80px] shrink-0 z-10">
                <span className="text-[13px] font-normal leading-4 text-white/60">
                    Today
                </span>
                <span className="text-[20px] font-bold leading-6 text-white tracking-[-0.2px]">
                    {todayEarnings}
                </span>
            </div>

            {/* Profile with rating */}
            <button
                type="button"
                onClick={onProfileClick}
                className="cursor-pointer flex flex-col items-center relative z-10"
                aria-label="View profile"
            >
                <div className="mb-[-8px]">
                    <Avatar className="size-14">
                        <AvatarImage src={userAvatar} alt={userName || "Profile"} />
                        <AvatarFallback>
                            {userName?.charAt(0) || "U"}
                        </AvatarFallback>
                    </Avatar>
                </div>

                {/* Rating badge */}
                {userRating !== undefined && (
                    <Badge className="absolute -bottom-1 -right-1 bg-[var(--color-brand-yellow)] border-2 border-white text-black font-bold h-8 w-8 p-0 justify-center rounded-2xl text-[13px]">
                        {userRating.toFixed(1)}
                    </Badge>
                )}
            </button>
        </div>
    );
}