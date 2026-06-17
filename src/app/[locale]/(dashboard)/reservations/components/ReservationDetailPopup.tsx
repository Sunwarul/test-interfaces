"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ErrorState } from "@/components/shared/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatTime } from "@/lib/utils";
import { useReservationById } from "../hooks/useReservationById";
import type { ReservationStatus } from "../types/reservations.types";

interface ReservationDetailPopupProps {
    reservationId: string | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ReservationDetailPopup({
    reservationId,
    open,
    onOpenChange,
}: ReservationDetailPopupProps) {
    const { data, isLoading, isError, refetch } = useReservationById({
        id: reservationId,
    });

    const item = data?.data?.item;

    const status = item?.status as ReservationStatus | undefined;
    const statusLabel = status
        ? status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, " ")
        : "";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0">
                <DialogHeader className="sticky top-0 bg-white z-10 flex flex-row items-center justify-between p-6 border-b border-black/10">
                    <DialogTitle className="text-[22px] font-bold tracking-[-0.22px]">
                        Reservation Details
                    </DialogTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-12 rounded-full"
                        onClick={() => onOpenChange(false)}
                    >
                        <X className="size-6" />
                    </Button>
                </DialogHeader>

                <div className="p-6">
                    {isLoading ? (
                        <DetailSkeleton />
                    ) : isError ? (
                        <ErrorState
                            onRetry={refetch}
                            className="py-8"
                        />
                    ) : !item ? (
                        <div className="py-8 text-center text-black/60">
                            Reservation not found
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Details Section */}
                            <div className="border-b border-black/10 pb-6 space-y-4">
                                <h3 className="text-[16px] font-medium text-[#1a1a1a] tracking-[-0.16px]">
                                    Details
                                </h3>

                                <div className="grid grid-cols-[220px_1fr] gap-x-4 gap-y-4">
                                    {/* Feedback ID */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-[16px] text-black/40 w-[144px] shrink-0">
                                            Feedback ID
                                        </span>
                                        <span className="text-[16px] text-[#1a1a1a] tracking-[-0.16px]">
                                            {item.feedbackID ?? "—"}
                                        </span>
                                    </div>

                                    {/* Reservation Date */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-[16px] text-black/40 w-[144px] shrink-0">
                                            Reservation Date
                                        </span>
                                        <span className="text-[16px] text-[#1a1a1a] tracking-[-0.16px]">
                                            {formatDate(item.reservationDate)}
                                        </span>
                                    </div>

                                    {/* Reservation Time */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-[16px] text-black/40 w-[144px] shrink-0">
                                            Reservation Time
                                        </span>
                                        <span className="text-[16px] text-[#1a1a1a] tracking-[-0.16px]">
                                            {formatTime(item.reservationTime)}
                                        </span>
                                    </div>

                                    {/* Status */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-[16px] text-black/40 w-[144px] shrink-0">
                                            Status
                                        </span>
                                        <StatusBadge variant={status ?? "default"}>
                                            {statusLabel}
                                        </StatusBadge>
                                    </div>

                                    {/* Table No. */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-[16px] text-black/40 w-[144px] shrink-0">
                                            Table No.
                                        </span>
                                        <span className="text-[16px] text-[#1a1a1a] tracking-[-0.16px]">
                                            {item.tableNo ?? "—"}
                                        </span>
                                    </div>

                                    {/* Number of People */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-[16px] text-black/40 w-[144px] shrink-0">
                                            Number of People
                                        </span>
                                        <span className="text-[16px] text-[#1a1a1a] tracking-[-0.16px]">
                                            {item.numberOfPeople}
                                        </span>
                                    </div>

                                    {/* Occasion */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-[16px] text-black/40 w-[144px] shrink-0">
                                            Occasion
                                        </span>
                                        <span className="text-[16px] text-[#1a1a1a] tracking-[-0.16px]">
                                            {item.occasion ?? "—"}
                                        </span>
                                    </div>

                                    {/* Coupon Code */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-[16px] text-black/40 w-[144px] shrink-0">
                                            Coupon Code
                                        </span>
                                        <span className="text-[16px] text-[#1a1a1a] tracking-[-0.16px]">
                                            {item.couponCode ?? "—"}
                                        </span>
                                    </div>

                                    {/* Additional Information */}
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[16px] text-black/40 w-[144px]">
                                            Additional Information
                                        </span>
                                        <span className="text-[16px] text-[#1a1a1a] tracking-[-0.16px] whitespace-pre-wrap break-words">
                                            {item.additionalInformation ?? "—"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information Section */}
                            <div className="space-y-4">
                                <h3 className="text-[16px] font-medium text-[#1a1a1a] tracking-[-0.16px]">
                                    Contact Information
                                </h3>

                                <div className="grid grid-cols-[220px_1fr] gap-x-4 gap-y-4">
                                    {/* Name */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-[16px] text-black/40 w-[144px] shrink-0">
                                            Name
                                        </span>
                                        <span className="text-[16px] text-[#1a1a1a] tracking-[-0.16px]">
                                            {item.name ?? "—"}
                                        </span>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-[16px] text-black/40 w-[144px] shrink-0">
                                            Phone Number
                                        </span>
                                        <span className="text-[16px] text-[#1a1a1a] tracking-[-0.16px]">
                                            {item.phone ?? "—"}
                                        </span>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-2">
                                        <span className="text-[16px] text-black/40 w-[144px] shrink-0">
                                            Email
                                        </span>
                                        <span className="text-[16px] text-[#1a1a1a] tracking-[-0.16px]">
                                            {item.email ?? "—"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}

function DetailSkeleton() {
    return (
        <div className="space-y-6">
            {/* Details Section */}
            <div className="border-b border-black/10 pb-6 space-y-4">
                <Skeleton className="h-5 w-24" />
                <div className="grid grid-cols-[220px_1fr] gap-x-4 gap-y-4">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <Skeleton className="h-5 w-32" />
                            <Skeleton className="h-5 w-40" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-4">
                <Skeleton className="h-5 w-44" />
                <div className="grid grid-cols-[220px_1fr] gap-x-4 gap-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-5 w-48" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}