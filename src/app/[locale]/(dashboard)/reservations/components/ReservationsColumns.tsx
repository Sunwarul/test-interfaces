"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowDownUp, Eye, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDate, formatTime } from "@/lib/utils";
import type { ReservationItem, ReservationStatus } from "../types/reservations.types";

interface ReservationsColumnsProps {
    onView: (reservation: ReservationItem) => void;
    onEdit: (reservation: ReservationItem) => void;
    onConfirm: (reservation: ReservationItem) => void;
    onReject: (reservation: ReservationItem) => void;
    isConfirming: (id: string) => boolean;
    isRejecting: (id: string) => boolean;
}

export function getReservationsColumns({
    onView,
    onEdit,
    onConfirm,
    onReject,
    isConfirming,
    isRejecting,
}: ReservationsColumnsProps): ColumnDef<ReservationItem>[] {
    return [
        {
            accessorKey: "index",
            header: "#",
            size: 80,
            cell: ({ row }) => (
                <div className="text-center">{row.original.index}</div>
            ),
        },
        {
            accessorKey: "date",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="h-8 px-3 text-[13px] font-bold text-black/60 hover:text-black"
                >
                    Date
                    <ArrowDownUp className="ml-1 size-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-[16px] tracking-[-0.16px]">
                    {formatDate(row.original.date)}
                </span>
            ),
        },
        {
            accessorKey: "time",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="h-8 px-3 text-[13px] font-bold text-black/60 hover:text-black"
                >
                    Time
                    <ArrowDownUp className="ml-1 size-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-[16px] tracking-[-0.16px]">
                    {formatTime(row.original.time)}
                </span>
            ),
        },
        {
            accessorKey: "guests",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="h-8 px-3 text-[13px] font-bold text-black/60 hover:text-black"
                >
                    Guests
                    <ArrowDownUp className="ml-1 size-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-[16px] tracking-[-0.16px]">
                    {row.original.guests}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            size: 166,
            cell: ({ row }) => {
                const status = row.original.status as ReservationStatus;
                const label =
                    status.charAt(0).toUpperCase() +
                    status.slice(1).replace(/_/g, " ");

                return <StatusBadge variant={status}>{label}</StatusBadge>;
            },
        },
        {
            id: "actions",
            header: "Actions",
            size: 247,
            cell: ({ row }) => {
                const reservation = row.original;
                const status = reservation.status;
                const isPending = status === "pending";
                const confirming = isConfirming(reservation.id);
                const rejecting = isRejecting(reservation.id);

                return (
                    <div className="flex items-center gap-1">
                        {/* View */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full"
                            onClick={() => onView(reservation)}
                            aria-label="View reservation"
                        >
                            <Eye className="size-5" />
                        </Button>

                        {/* Edit */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full"
                            onClick={() => onEdit(reservation)}
                            aria-label="Edit reservation"
                        >
                            <Pencil className="size-5" />
                        </Button>

                        {/* Confirm (only for pending) */}
                        {isPending && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-3 rounded-full bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/90"
                                onClick={() => onConfirm(reservation)}
                                disabled={confirming || rejecting}
                            >
                                {confirming ? "..." : "Confirm"}
                            </Button>
                        )}

                        {/* Reject (only for pending) */}
                        {isPending && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-3 rounded-full bg-black/10 text-[#1a1a1a] hover:bg-black/20"
                                onClick={() => onReject(reservation)}
                                disabled={confirming || rejecting}
                            >
                                {rejecting ? "..." : "Reject"}
                            </Button>
                        )}
                    </div>
                );
            },
        },
    ];
}