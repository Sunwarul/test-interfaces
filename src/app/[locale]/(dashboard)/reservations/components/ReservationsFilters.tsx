"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./DatePicker";
import { cn } from "@/lib/utils";

interface ReservationsFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    date: Date | null;
    onDateChange: (date: Date | null) => void;
    onAddReservation: () => void;
}

export function ReservationsFilters({
    search,
    onSearchChange,
    status,
    onStatusChange,
    date,
    onDateChange,
    onAddReservation,
}: ReservationsFiltersProps) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const datePickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                datePickerRef.current &&
                !datePickerRef.current.contains(event.target as Node)
            ) {
                setShowDatePicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const formatDate = (d: Date) => {
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="flex items-center justify-between border-b border-[var(--border-black-10)] bg-[var(--background-white-60)]">
            {/* Filters */}
            <div className="flex">
                {/* Search */}
                <div className="flex h-14 w-[200px] flex-col justify-center border-r border-[var(--border-black-10)] px-3 py-2">
                    <span className="text-xs text-[var(--color-text-black-60)]">
                        Search
                    </span>
                    <div className="flex items-center gap-1">
                        <Search className="size-5 text-[var(--color-text-black-60)]" />
                        <Input
                            value={search}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search..."
                            className="h-auto border-0 p-0 text-sm font-bold focus-visible:ring-0"
                        />
                    </div>
                </div>

                {/* Status */}
                <div className="flex h-14 w-[160px] flex-col justify-center border-r border-[var(--border-black-10)] px-3 py-2">
                    <span className="text-xs text-[var(--color-text-black-60)]">
                        Status
                    </span>
                    <Select value={status} onValueChange={onStatusChange}>
                        <SelectTrigger className="h-auto border-0 p-0 text-sm font-bold focus:ring-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="expired">Request Expired</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Booking Date */}
                <div
                    ref={datePickerRef}
                    className="relative flex h-14 w-[160px] cursor-pointer flex-col justify-center border-r border-[var(--border-black-10)] px-3 py-2"
                    onClick={() => setShowDatePicker(!showDatePicker)}
                >
                    <span className="text-xs text-[var(--color-text-black-60)]">
                        Booking Date
                    </span>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold">
                            {date ? formatDate(date) : "Select a Date"}
                        </span>
                        <ChevronDown className="size-5 text-[var(--color-text-black-60)]" />
                    </div>
                    <DatePicker
                        isOpen={showDatePicker}
                        onClose={() => setShowDatePicker(false)}
                        onSelect={onDateChange}
                        selectedDate={date || undefined}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 px-3">
                <Button
                    onClick={onAddReservation}
                    className="h-10 rounded-full bg-black pl-3 pr-4 text-sm font-bold text-white hover:bg-gray-800"
                >
                    <Plus className="mr-2 size-5" />
                    Make a Reservation
                </Button>
            </div>
        </div>
    );
}