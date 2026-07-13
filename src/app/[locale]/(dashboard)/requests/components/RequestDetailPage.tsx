"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/shared/ErrorState";
import { toast } from "sonner";
import { useRequestDetail } from "../hooks/useRequestDetail";
import { RequestMapView } from "./RequestMapView";
import { RequestBottomSheet } from "./RequestBottomSheet";
import type { LocationData } from "../types/requests.types";

export function RequestDetailPage() {
    const t = useTranslations();
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const { data, isLoading, isError, refetch } = useRequestDetail({ id });

    const handleAccept = () => {
        // TODO: Wire to actual accept endpoint when available
        toast.info("Accept endpoint not yet available");
    };

    const handleClose = () => {
        router.back();
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="flex flex-col h-screen bg-white">
                {/* Map skeleton */}
                <div className="flex-1 relative">
                    <Skeleton className="absolute inset-0" />
                </div>

                {/* Bottom sheet skeleton */}
                <div className="bg-white rounded-t-[32px] shadow-[-4px_0_24px_rgba(0,0,0,0.2)]">
                    <div className="px-6 pt-6 pb-4">
                        <Skeleton className="h-12 w-40 mb-2" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="px-6 pb-6 space-y-4">
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-6 w-full" />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-6 w-full" />
                            </div>
                        </div>
                    </div>
                    <div className="px-6 pb-8">
                        <Skeleton className="h-14 w-full rounded-[32px]" />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="flex flex-col h-screen bg-white">
                <div className="flex-1 flex items-center justify-center">
                    <ErrorState onRetry={refetch} />
                </div>
            </div>
        );
    }

    // Extract data from response
    const item = data?.data?.item;
    if (!item) {
        return (
            <div className="flex flex-col h-screen bg-white">
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">Request not found</p>
                </div>
            </div>
        );
    }

    // Build location data
    const locations: LocationData[] = [
        {
            type: "pickup",
            address: item.deliveryAddress?.value ?? "Pickup location",
            distance: item.deliveryDistance
                ? `${item.deliveryDistance.toFixed(1)} km away`
                : undefined,
            eta: "2 min",
        },
        {
            type: "delivery",
            address: "Delivery location",
            tripDistance: item.deliveryDistance
                ? `${item.deliveryDistance.toFixed(1)} km trip`
                : undefined,
            eta: "16 min",
        },
    ];

    // Format price
    const currencySymbol = item.currencyOfTotalAmount?.value ?? "₹";
    const price = item.totalPrice?.toFixed(2) ?? "0.00";
    const paymentMethod = item.paymentMethod?.value ?? "Cash";
    const distance = item.deliveryDistance
        ? `${item.deliveryDistance.toFixed(1)} km`
        : "0 km";

    // Payment status display
    const paymentStatus = item.paymentStatus === 1 ? "Paid" : "Pending";

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* App Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 px-6 pt-[59px] pb-4">
                <div className="absolute inset-x-0 top-0 h-[130px] bg-gradient-to-b from-white to-transparent" />
                <div className="flex justify-end">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        className="size-14 rounded-[32px] bg-white shadow-[0_0_24px_rgba(0,0,0,0.2)] hover:bg-gray-50"
                    >
                        <ArrowLeft className="size-6 text-black" />
                    </Button>
                </div>
            </div>

            {/* Map View */}
            <div className="flex-1 relative">
                <RequestMapView className="absolute inset-0" />
            </div>

            {/* Bottom Sheet */}
            <RequestBottomSheet
                price={price}
                currency={currencySymbol}
                paymentMethod={paymentMethod}
                paymentStatus={paymentStatus}
                distance={distance}
                locations={locations}
                onAccept={handleAccept}
            />
        </div>
    );
}