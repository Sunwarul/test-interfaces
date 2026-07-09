"use client";

import { Eye, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReservationStatusBadge } from "./ReservationStatusBadge";
import { cn } from "@/lib/utils";

export interface ReservationRow {
    id: string;
    number: number;
    date: string;
    time: string;
    guests: number;
    status: number;
    name?: string;
    phone?: string;
    email?: string;
    occasion?: string;
    tableNo?: string;
    feedbackID?: string;
    couponCode?: string;
    additionalInformation?: string;
}

interface ReservationsTableProps {
    data: ReservationRow[];
    isLoading?: boolean;
    onView: (reservation: ReservationRow) => void;
    onEdit: (reservation: ReservationRow) => void;
    onConfirm: (reservation: ReservationRow) => void;
    onReject: (reservation: ReservationRow) => void;
}

export function ReservationsTable({
    data,
    isLoading,
    onView,
    onEdit,
    onConfirm,
    onReject,
}: ReservationsTableProps) {
    if (isLoading) {
        return (
            <div className="w-full">
                {/* Table Header */}
                <div className="flex h-12 border-b border-[var(--border-black-10)] bg-[rgba(26,26,26,0.05)]">
                    <div className="flex w-[80px] items-center justify-center px-3">
                        <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                            #
                        </span>
                    </div>
                    <div className="flex flex-1 items-center px-3">
                        <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                            Date
                        </span>
                    </div>
                    <div className="flex flex-1 items-center px-3">
                        <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                            Time
                        </span>
                    </div>
                    <div className="flex w-[96px] items-center px-3">
                        <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                            Guests
                        </span>
                    </div>
                    <div className="flex w-[166px] items-center px-3">
                        <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                            Status
                        </span>
                    </div>
                    <div className="flex w-[247px] items-center px-3">
                        <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                            Actions
                        </span>
                    </div>
                </div>

                {/* Skeleton Rows */}
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="flex h-16 items-center border-b border-[var(--border-black-10)] bg-[var(--background-white-60)] px-3"
                    >
                        <div className="flex w-[80px] items-center justify-center">
                            <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
                        </div>
                        <div className="flex flex-1 items-center">
                            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                        </div>
                        <div className="flex flex-1 items-center">
                            <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                        </div>
                        <div className="flex w-[96px] items-center">
                            <div className="h-4 w-8 animate-pulse rounded bg-gray-200" />
                        </div>
                        <div className="flex w-[166px] items-center">
                            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200" />
                        </div>
                        <div className="flex w-[247px] items-center gap-1">
                            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (data.length === 0) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-[var(--color-text-black-60)]">
                    No reservations found
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Table Header */}
            <div className="flex h-12 border-b border-[var(--border-black-10)] bg-[rgba(26,26,26,0.05)]">
                <div className="flex w-[80px] items-center justify-center px-3">
                    <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                        #
                    </span>
                </div>
                <div className="flex flex-1 items-center px-3">
                    <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                        Date
                    </span>
                </div>
                <div className="flex flex-1 items-center px-3">
                    <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                        Time
                    </span>
                </div>
                <div className="flex w-[96px] items-center px-3">
                    <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                        Guests
                    </span>
                </div>
                <div className="flex w-[166px] items-center px-3">
                    <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                        Status
                    </span>
                </div>
                <div className="flex w-[247px] items-center px-3">
                    <span className="text-xs font-bold uppercase text-[var(--color-text-black-60)]">
                        Actions
                    </span>
                </div>
            </div>

            {/* Table Rows */}
            {data.map((row, index) => (
                <div
                    key={row.id}
                    className="flex h-16 items-center border-b border-[var(--border-black-10)] bg-[var(--background-white-60)]"
                >
                    {/* # */}
                    <div className="flex w-[80px] items-center justify-center px-3">
                        <span className="text-base tracking-tight text-[var(--color-text-black-100)]">
                            {row.number}
                        </span>
                    </div>

                    {/* Date */}
                    <div className="flex flex-1 items-center px-3">
                        <span className="text-base tracking-tight text-[var(--color-text-black-100)]">
                            {row.date}
                        </span>
                    </div>

                    {/* Time */}
                    <div className="flex flex-1 items-center px-3">
                        <span className="text-base tracking-tight text-[var(--color-text-black-100)]">
                            {row.time}
                        </span>
                    </div>

                    {/* Guests */}
                    <div className="flex w-[96px] items-center px-3">
                        <span className="text-base tracking-tight text-[var(--color-text-black-100)]">
                            {row.guests}
                        </span>
                    </div>

                    {/* Status */}
                    <div className="flex w-[166px] items-center px-3">
                        <ReservationStatusBadge status={row.status} />
                    </div>

                    {/* Actions */}
                    <div className="flex w-[247px] items-center gap-1 px-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full hover:bg-gray-100"
                            onClick={() => onView(row)}
                        >
                            <Eye className="size-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full hover:bg-gray-100"
                            onClick={() => onEdit(row)}
                        >
                            <Edit2 className="size-5" />
                        </Button>
                        {row.status === 0 && (
                            <>
                                <Button
                                    size="sm"
                                    className="h-8 rounded-full bg-black px-3 text-sm font-bold text-white hover:bg-gray-800"
                                    onClick={() => onConfirm(row)}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 rounded-full border border-[var(--border-black-10)] px-3 text-sm font-bold"
                                    onClick={() => onReject(row)}
                                >
                                    Reject
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}