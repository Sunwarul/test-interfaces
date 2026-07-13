"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MapView } from "./MapView";
import { OrderHeader } from "./OrderHeader";
import { LocationList } from "./LocationList";
import { AcceptButton } from "./AcceptButton";
import { ErrorState } from "@/components/shared/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeliveryRequest } from "../hooks/useDeliveryRequest";

interface DeliveryRequestPageProps {
    id: string;
}

export function DeliveryRequestPage({ id }: DeliveryRequestPageProps) {
    const router = useRouter();
    const [isAccepting, setIsAccepting] = useState(false);
    const { data, isLoading, isError, refetch } = useDeliveryRequest({ id });

    const item = data?.data?.item;

    const handleAccept = async () => {
        setIsAccepting(true);
        // Simulate accept action - in real app, this would call an API
        try {
            toast.success("Order accepted successfully!");
            // Navigate back to list or to the accepted order
            router.push("/delivery-requests");
        } catch {
            toast.error("Failed to accept order");
        } finally {
            setIsAccepting(false);
        }
    };

    const handleClose = () => {
        router.push("/delivery-requests");
    };

    return (
        <div className="fixed inset-0 bg-white flex flex-col">
            {/* Map View - Full screen */}
            <div className="flex-1 relative">
                <MapView />

                {/* Close button overlay */}
                <div className="absolute top-14 right-6">
                    <button
                        onClick={handleClose}
                        className="w-14 h-14 rounded-full bg-white shadow-[0_0_24px_rgba(0,0,0,0.2)] flex items-center justify-center"
                        aria-label="Close"
                    >
                        <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Gradient overlay at top */}
                <div className="absolute top-0 left-0 right-0 h-[130px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
            </div>

            {/* Bottom Sheet */}
            <div className="bg-white rounded-t-[32px] shadow-[-4px_0_24px_rgba(0,0,0,0.2)] flex flex-col">
                {/* Content */}
                <div className="p-6">
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : isError ? (
                        <ErrorState
                            onRetry={refetch}
                            className="py-8"
                        />
                    ) : !item ? (
                        <div className="py-8 text-center text-black/60">
                            Delivery request not found
                        </div>
                    ) : (
                        <>
                            {/* Order Header */}
                            <OrderHeader item={item} className="mb-6" />

                            {/* Location List */}
                            <LocationList
                                pickupAddress="Mcdonald, No 4, 12 Floor, Block C, 4140 Parker Rd. Allentown"
                                deliveryAddress={item.deliveryAddress?.value ?? "—"}
                                pickupDistance="0.6 km away"
                                deliveryDistance={`${(item.deliveryDistance ?? 0).toFixed(1)} km trip`}
                                pickupEta="2min"
                                deliveryEta="16min"
                            />
                        </>
                    )}
                </div>

                {/* Accept Button */}
                <div className="px-6 pb-8 pt-4">
                    <AcceptButton
                        onClick={handleAccept}
                        isLoading={isAccepting}
                        disabled={isLoading || isError || !item}
                    />
                </div>
            </div>
        </div>
    );
}

function LoadingSkeleton() {
    return (
        <div className="space-y-6">
            {/* Header skeleton */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-4 w-24" />
            </div>

            {/* Location items skeleton */}
            <div className="space-y-6">
                {[1, 2].map((i) => (
                    <div key={i} className="flex gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-24 rounded-full" />
                                <Skeleton className="h-4 w-16" />
                            </div>
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-3/4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}