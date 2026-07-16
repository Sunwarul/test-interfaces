"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLanguages } from "../hooks/useLanguages";
import { LanguageRow } from "./LanguageRow";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import type { LanguageItem } from "../types/language.types";

interface LanguagePageProps {
    className?: string;
}

export function LanguagePage({ className }: LanguagePageProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState<LanguageItem | null>(null);

    const { data, isLoading, isError, refetch, isFetching } = useLanguages({
        search: searchQuery || undefined,
    });

    const languages = data?.data?.items ?? [];

    const handleSelect = useCallback((language: LanguageItem) => {
        setSelectedLanguage(language);
        toast.success(`Language changed to ${language.languageName}`);
    }, []);

    const handleBack = useCallback(() => {
        router.back();
    }, [router]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    return (
        <div
            className={cn(
                "relative w-[414px] h-[896px] bg-white overflow-hidden rounded-[40px] flex flex-col",
                className
            )}
        >
            {/* Header */}
            <div className="relative z-10 bg-white-100 pt-[59px] pb-4 px-6">
                <div className="flex items-center gap-3">
                    {/* Back Button */}
                    <button
                        onClick={handleBack}
                        className="w-14 h-14 bg-white rounded-[32px] shadow-[0_0_24px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label="Go back"
                    >
                        <ChevronLeft className="w-6 h-6 text-black-100" />
                    </button>

                    {/* Title */}
                    <h1 className="text-title-3 font-bold text-black-100">Select Language</h1>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative z-10 px-6 pb-4">
                <div className="h-10 bg-black-5 rounded-[24px] flex items-center px-4 gap-2">
                    <Search className="w-5 h-5 text-black-40 shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search Language..."
                        className="flex-1 bg-transparent text-body-normal text-black-100 placeholder:text-black-40 outline-none"
                    />
                </div>
            </div>

            {/* Language List */}
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    // Loading skeleton
                    <div className="px-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-[60px] flex items-center justify-between border-b border-black-10"
                            >
                                <div className="h-5 w-24 bg-black-10 rounded animate-pulse" />
                                <div className="w-10 h-10 rounded-full bg-black-10 animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : isError ? (
                    <ErrorState onRetry={refetch} />
                ) : languages.length === 0 ? (
                    <EmptyState
                        title={searchQuery ? "No languages found" : "No languages available"}
                        description={
                            searchQuery
                                ? "Try a different search term"
                                : "Languages will appear here once available"
                        }
                        action={
                            searchQuery
                                ? {
                                      label: "Clear search",
                                      onClick: () => setSearchQuery(""),
                                  }
                                : undefined
                        }
                    />
                ) : (
                    // Language rows
                    <div className="pb-8">
                        {languages.map((language) => (
                            <LanguageRow
                                key={language.id}
                                language={language}
                                isSelected={selectedLanguage?.id === language.id}
                                onSelect={handleSelect}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Loading overlay when fetching more */}
            {isFetching && !isLoading && (
                <div className="absolute inset-0 bg-black-20/30 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-brand-purple border-t-transparent rounded-full animate-spin" />
                </div>
            )}
        </div>
    );
}