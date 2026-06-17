"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { ReservationFilters } from "../types/reservations.types";

interface ReservationsFiltersProps {
    filters: ReservationFilters;
    onFiltersChange: (filters: ReservationFilters) => void;
    statusOptions: Array<{ value: string; label: string }>;
    onAddReservation: () => void;
}

export function ReservationsFilters({
    filters,
    onFiltersChange,
    statusOptions,
    onAddReservation,
}: ReservationsFiltersProps) {
    const [dateOpen, setDateOpen] = useState(false);

    const handleSearchChange = (value: string) => {
        onFiltersChange({ ...filters, search: value });
    };

    const handleStatusChange = (value: string) => {
        onFiltersChange({ ...filters, status: value });
    };

    const handleDateChange = (date: Date | undefined) => {
        onFiltersChange({
            ...filters,
            date: date ? date.toISOString().split("T")[0] : "",
        });
        setDateOpen(false);
    };

    const selectedStatus = statusOptions.find(
        (opt) => opt.value === filters.status
    );

    return (
        <div className="flex items-center justify-between border-b border-black/10">
            {/* Filter Controls */}
            <div className="flex items-center">
                {/* Search */}
                <div className="w-[200px] h-14 flex flex-col justify-center px-3 border-r border-black/10">
                    <span className="text-[13px] text-black/60 leading-4">Search</span>
                    <div className="relative flex items-center">
                        <Search className="absolute left-0 size-5 text-black/40 pointer-events-none" />
                        <Input
                            type="search"
                            value={filters.search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Search..."
                            className="h-8 pl-6 pr-0 text-[13px] font-bold border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                </div>

                {/* Status Filter */}
                <div className="w-[160px] h-14 flex flex-col justify-center px-3 border-r border-black/10">
                    <span className="text-[13px] text-black/60 leading-4">Status</span>
                    <select
                        value={filters.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="flex items-center justify-between h-8 text-[13px] font-bold bg-transparent border-none cursor-pointer focus:outline-none"
                    >
                        {statusOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date Filter */}
                <div className="w-[160px] h-14 flex flex-col justify-center px-3 border-r border-black/10">
                    <span className="text-[13px] text-black/60 leading-4">Booking Date</span>
                    <Popover open={dateOpen} onOpenChange={setDateOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center justify-between h-8 px-0 text-[13px] font-bold hover:bg-transparent"
                            >
                                <span className="text-[#1a1a1a]">
                                    {filters.date
                                        ? new Date(filters.date).toLocaleDateString(
                                              "en-US",
                                              {
                                                  month: "short",
                                                  day: "numeric",
                                                  year: "numeric",
                                              }
                                          )
                                        : "Select a Date"}
                                </span>
                                <ChevronDown className="size-5 text-black/60" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={
                                    filters.date
                                        ? new Date(filters.date)
                                        : undefined
                                }
                                onSelect={handleDateChange}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 px-3">
                <Button
                    className="h-10 px-4 gap-1 rounded-full bg-[#1a1a1a] text-white hover:bg-[#1a1a1a]/90"
                    onClick={onAddReservation}
                >
                    <span className="size-5">+</span>
                    <span className="text-[14px] font-bold">Make a Reservation</span>
                </Button>
            </div>
        </div>
    );
}