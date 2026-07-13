"use client";

import { useEffect, useRef, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DebouncedSearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    debounceMs?: number;
    className?: string;
}

export function DebouncedSearchInput({
    value,
    onChange,
    placeholder = "Search...",
    debounceMs = 300,
    className,
}: DebouncedSearchInputProps) {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const onChangeRef = useRef(onChange);

    // Keep onChange ref stable
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Debounced onChange
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            onChangeRef.current(newValue);
        }, debounceMs);
    }, [debounceMs]);

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-black/40 pointer-events-none" />
            <Input
                type="search"
                defaultValue={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={`pl-10 h-11 ${className ?? ""}`}
            />
        </div>
    );
}