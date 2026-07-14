"use client";

import { useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useReferRestaurant } from "../hooks/useReferRestaurant";
import { ProfileHeader } from "./ProfileHeader";
import { BottomSheetCard } from "./BottomSheetCard";
import { OfflineFooter } from "./OfflineFooter";
import { ErrorState } from "@/components/shared/ErrorState";
import { MapPin } from "lucide-react";

export function ReferRestaurantPage() {
    const router = useRouter();
    const params = useParams();
    const recordId = params.id as string;

    const { data, isLoading, isError, refetch } = useReferRestaurant(recordId);

    const handleMenuClick = () => {
        router.push("/");
    };

    const handleProfileClick = () => {
        // Navigate to profile
        router.push("/profile");
    };

    const handleShowQRCode = () => {
        // Show QR code modal - future implementation
        console.log("Show QR Code clicked");
    };

    const handlePlayVideo = () => {
        // Play video - future implementation
        console.log("Play video clicked");
    };

    const handleGoOnline = () => {
        // Toggle online status - future implementation
        console.log("Go online clicked");
    };

    // Extract data from response
    const item = data?.data?.item;
    const commissionEarned = item?.commissionEarned ?? 0;
    const referrals = item?.referrals ?? 0;
    const currencySymbol = item?.currency?.value ?? "₹";

    return (
        <div className="relative bg-white h-screen overflow-hidden w-full max-w-[414px] mx-auto">
            {/* Map background */}
            <div className="absolute inset-0 bg-gray-200">
                {/* Placeholder map - in production, use actual map component */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
                    {/* Map grid pattern */}
                    <div className="absolute inset-0 opacity-20">
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={`h-${i}`}
                                className="absolute h-px bg-gray-400 w-full"
                                style={{ top: `${i * 10}%` }}
                            />
                        ))}
                        {[...Array(10)].map((_, i) => (
                            <div
                                key={`v-${i}`}
                                className="absolute w-px bg-gray-400 h-full"
                                style={{ left: `${i * 10}%` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Current location marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                    <MapPin className="size-12 text-blue-500 fill-blue-100" />
                </div>
            </div>

            {/* Map zoom controls */}
            <div className="absolute bottom-[340px] right-4 flex flex-col gap-1">
                <button
                    type="button"
                    className="bg-white border border-black/10 cursor-pointer flex items-center justify-center rounded-full size-11 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.16)]"
                    aria-label="Zoom in"
                >
                    <span className="text-xl font-bold">+</span>
                </button>
                <button
                    type="button"
                    className="bg-white border border-black/10 cursor-pointer flex items-center justify-center rounded-full size-11 shadow-[0px_0px_16px_0px_rgba(0,0,0,0.16)]"
                    aria-label="Zoom out"
                >
                    <span className="text-xl font-bold">−</span>
                </button>
            </div>

            {/* Profile header */}
            <ProfileHeader
                todayEarnings="₹2568.50"
                userName="John Doe"
                userAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                userRating={4.8}
                onMenuClick={handleMenuClick}
                onProfileClick={handleProfileClick}
            />

            {/* Bottom sheet card */}
            {isLoading ? (
                <div className="absolute bg-white left-4 right-4 rounded-[32px] shadow-[0px_-4px_48px_0px_rgba(0,0,0,0.2)] top-[130px] p-6">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-3/4" />
                        <div className="h-20 bg-gray-200 rounded" />
                        <div className="h-[187px] bg-gray-200 rounded-3xl" />
                        <div className="h-12 bg-gray-200 rounded-full" />
                        <div className="flex gap-2">
                            <div className="h-[100px] bg-gray-200 rounded-3xl flex-1" />
                            <div className="h-[100px] bg-gray-200 rounded-3xl flex-1" />
                        </div>
                    </div>
                </div>
            ) : isError ? (
                <div className="absolute bg-white left-4 right-4 rounded-[32px] shadow-[0px_-4px_48px_0px_rgba(0,0,0,0.2)] top-[130px] p-6">
                    <ErrorState onRetry={refetch} />
                </div>
            ) : (
                <BottomSheetCard
                    commissionEarned={commissionEarned}
                    referrals={referrals}
                    currencySymbol={currencySymbol}
                    onShowQRCode={handleShowQRCode}
                    onPlayVideo={handlePlayVideo}
                />
            )}

            {/* Offline footer */}
            <OfflineFooter
                isOnline={false}
                onGoOnline={handleGoOnline}
            />
        </div>
    );
}