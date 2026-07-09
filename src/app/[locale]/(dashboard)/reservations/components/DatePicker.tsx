"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DatePickerProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (date: Date) => void;
    selectedDate?: Date;
}

const DAYS_OF_WEEK = ["M", "T", "W", "T", "F", "S", "S"];
const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export function DatePicker({
    isOpen,
    onClose,
    onSelect,
    selectedDate,
}: DatePickerProps) {
    const [currentDate, setCurrentDate] = useState(
        selectedDate || new Date()
    );

    if (!isOpen) return null;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startingDay = (firstDayOfMonth.getDay() + 6) % 7; // Monday = 0
    const daysInMonth = lastDayOfMonth.getDate();

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const handleDateClick = (day: number) => {
        const selected = new Date(year, month, day);
        onSelect(selected);
        onClose();
    };

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        );
    };

    const isSelected = (day: number) => {
        if (!selectedDate) return false;
        return (
            day === selectedDate.getDate() &&
            month === selectedDate.getMonth() &&
            year === selectedDate.getFullYear()
        );
    };

    const days: (number | null)[] = [
        ...Array(startingDay).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    // Pad to complete the last row
    while (days.length % 7 !== 0) {
        days.push(null);
    }

    return (
        <div className="absolute left-0 top-full z-10 mt-2 w-[300px] rounded-2xl border border-[var(--border-black-10)] bg-white p-4 shadow-lg">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <button
                    onClick={prevMonth}
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100"
                >
                    <ChevronLeft className="size-6" />
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{MONTHS[month]}</span>
                    <span className="text-base font-medium">{year}</span>
                </div>
                <button
                    onClick={nextMonth}
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-100"
                >
                    <ChevronRight className="size-6" />
                </button>
            </div>

            {/* Days of week header */}
            <div className="mb-2 grid grid-cols-7 gap-1">
                {DAYS_OF_WEEK.map((day, i) => (
                    <div
                        key={i}
                        className="flex h-5 items-center justify-center text-xs text-[var(--color-text-black-40)]"
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
                {days.map((day, i) => (
                    <button
                        key={i}
                        onClick={() => day && handleDateClick(day)}
                        disabled={!day}
                        className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full text-sm",
                            day
                                ? "hover:bg-gray-100"
                                : "cursor-default opacity-0",
                            isToday(day!) && day && "bg-[var(--color-brand-orange)] text-white",
                            isSelected(day!) && day && !isToday(day!) && "bg-gray-100"
                        )}
                    >
                        {day}
                    </button>
                ))}
            </div>

            {/* Actions */}
            <div className="mt-4 flex justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onClose}
                    className="h-8 rounded-full border border-[var(--border-black-10)] px-3 text-sm font-bold"
                >
                    Cancel
                </Button>
                <Button
                    size="sm"
                    onClick={() => {
                        if (selectedDate) {
                            onSelect(selectedDate);
                            onClose();
                        }
                    }}
                    className="h-8 rounded-full bg-black px-3 text-sm font-bold text-white hover:bg-gray-800"
                >
                    Apply
                </Button>
            </div>
        </div>
    );
}