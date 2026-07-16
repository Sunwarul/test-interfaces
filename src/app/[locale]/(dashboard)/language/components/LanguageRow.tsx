"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LanguageItem } from "../types/language.types";

interface LanguageRowProps {
    language: LanguageItem;
    isSelected: boolean;
    onSelect: (language: LanguageItem) => void;
}

export function LanguageRow({ language, isSelected, onSelect }: LanguageRowProps) {
    return (
        <button
            onClick={() => onSelect(language)}
            className={cn(
                "w-full h-[60px] flex items-center justify-between px-6 border-b border-black-10",
                "hover:bg-black-5 transition-colors duration-150",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-inset"
            )}
            aria-pressed={isSelected}
            aria-label={`Select ${language.name}`}
        >
            <span className="text-body-bold text-black-100">{language.name}</span>

            {/* Radio indicator */}
            <div
                className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200",
                    isSelected
                        ? "bg-brand-purple"
                        : "bg-black-10"
                )}
            >
                <Check
                    className={cn(
                        "w-5 h-5 transition-opacity duration-200",
                        isSelected ? "text-white-100 opacity-100" : "text-white-100 opacity-0"
                    )}
                />
            </div>
        </button>
    );
}