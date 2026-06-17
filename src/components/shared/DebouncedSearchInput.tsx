"use client";

import { useEffect, useRef, useState } from "react";
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
    const [localValue, setLocalValue] = useState(value);
    const onChangeRef = useRef(onChange);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Keep onChange ref stable
    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange]);

    // Sync external value
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // Debounce
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            onChangeRef.current(localValue);
        }, debounceMs);
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [localValue, debounceMs]);

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-black/40 pointer-events-none" />
            <Input
                type="search"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className={`pl-10 h-11 ${className ?? ""}`}
            />
        </div>
    );
}