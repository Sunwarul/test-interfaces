"use client";

import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ReservationItem } from "../types/reservations.types";

interface ReservationsRowActionsProps {
    reservation: ReservationItem;
    onView: (reservation: ReservationItem) => void;
    onEdit: (reservation: ReservationItem) => void;
    onDelete: (reservation: ReservationItem) => void;
}

export function ReservationsRowActions({
    reservation,
    onView,
    onEdit,
    onDelete,
}: ReservationsRowActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full"
                >
                    <MoreHorizontal className="size-5" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onView(reservation)}>
                    <Eye className="mr-2 size-4" />
                    View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(reservation)}>
                    <Pencil className="mr-2 size-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => onDelete(reservation)}
                    className="text-destructive focus:text-destructive"
                >
                    <Trash2 className="mr-2 size-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}