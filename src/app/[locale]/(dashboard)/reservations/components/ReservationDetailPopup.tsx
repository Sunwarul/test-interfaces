"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ReservationStatusBadge } from "./ReservationStatusBadge";
import type { ReservationRow } from "./ReservationsTable";

interface ReservationDetailPopupProps {
    isOpen: boolean;
    onClose: () => void;
    reservation: ReservationRow | null;
    isLoading?: boolean;
}

export function ReservationDetailPopup({
    isOpen,
    onClose,
    reservation,
    isLoading,
}: ReservationDetailPopupProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative z-10 w-[800px] rounded-2xl bg-white shadow-[0px_24px_36px_rgba(0,0,0,0.2)]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-[var(--border-black-10)] p-4">
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-black-100)]">
                        Reservation Details
                    </h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-12 rounded-full hover:bg-gray-100"
                        onClick={onClose}
                    >
                        <X className="size-6" />
                    </Button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {isLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                            <Skeleton className="h-8 w-full" />
                        </div>
                    ) : reservation ? (
                        <div className="space-y-6">
                            {/* Details Section */}
                            <div className="border-b border-[var(--border-black-10)] pb-4">
                                <h3 className="mb-4 text-base font-medium text-[var(--color-text-black-100)]">
                                    Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-start gap-2">
                                        <span className="w-36 text-sm text-[var(--color-text-black-40)]">
                                            Feedback ID
                                        </span>
                                        <span className="text-sm text-[var(--color-text-black-100)]">
                                            {reservation.feedbackID || "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-36 text-sm text-[var(--color-text-black-40)]">
                                            Reservation Date
                                        </span>
                                        <span className="text-sm text-[var(--color-text-black-100)]">
                                            {reservation.date}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-36 text-sm text-[var(--color-text-black-40)]">
                                            Reservation Time
                                        </span>
                                        <span className="text-sm text-[var(--color-text-black-100)]">
                                            {reservation.time}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-36 text-sm text-[var(--color-text-black-40)]">
                                            Status
                                        </span>
                                        <ReservationStatusBadge status={reservation.status} />
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-36 text-sm text-[var(--color-text-black-40)]">
                                            Table No.
                                        </span>
                                        <span className="text-sm text-[var(--color-text-black-100)]">
                                            {reservation.tableNo || "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-36 text-sm text-[var(--color-text-black-40)]">
                                            Number of People
                                        </span>
                                        <span className="text-sm text-[var(--color-text-black-100)]">
                                            {reservation.guests}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-36 text-sm text-[var(--color-text-black-40)]">
                                            Occasion
                                        </span>
                                        <span className="text-sm text-[var(--color-text-black-100)]">
                                            {reservation.occasion || "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-36 text-sm text-[var(--color-text-black-40)]">
                                            Coupon Code
                                        </span>
                                        <span className="text-sm text-[var(--color-text-black-100)]">
                                            {reservation.couponCode || "—"}
                                        </span>
                                    </div>
                                    <div className="col-span-2 flex flex-col gap-1">
                                        <span className="text-sm text-[var(--color-text-black-40)]">
                                            Additional Information
                                        </span>
                                        <span className="text-sm text-[var(--color-text-black-100)]">
                                            {reservation.additionalInformation || "—"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Information Section */}
                            <div>
                                <h3 className="mb-4 text-base font-medium text-[var(--color-text-black-100)]">
                                    Contact Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-start gap-2">
                                        <span className="w-36 text-sm text-[var(--color-text-black-40)]">
                                            Name
                                        </span>
                                        <span className="text-sm text-[var(--color-text-black-100)]">
                                            {reservation.name || "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-36 text-sm text-[var(--color-text-black-40)]">
                                            Phone Number
                                        </span>
                                        <span className="text-sm text-[var(--color-text-black-100)]">
                                            {reservation.phone || "—"}
                                        </span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-36 text-sm text-[var(--color-text-black-40)]">
                                            Email
                                        </span>
                                        <span className="text-sm text-[var(--color-text-black-100)]">
                                            {reservation.email || "—"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-64 items-center justify-center">
                            <p className="text-[var(--color-text-black-60)]">
                                No reservation data available
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}