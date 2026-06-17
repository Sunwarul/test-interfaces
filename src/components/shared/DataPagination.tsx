"use client";

import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataPaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (size: number) => void;
    pageSizeOptions?: number[];
}

export function DataPagination({
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 15, 25, 50, 100],
}: DataPaginationProps) {
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    const canGoFirst = currentPage > 1;
    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;
    const canGoLast = currentPage < totalPages;

    return (
        <div className="flex items-center justify-end gap-6 px-1.5 py-3 bg-white/60">
            {/* Rows per page */}
            <div className="flex items-center gap-2">
                <span className="text-[13px] text-black/60">Rows per page:</span>
                {onPageSizeChange ? (
                    <select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        className="h-8 px-2 text-[13px] font-bold text-[#1a1a1a] bg-transparent border-none cursor-pointer focus:outline-none"
                    >
                        {pageSizeOptions.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span className="text-[13px] font-bold text-[#1a1a1a]">{pageSize}</span>
                )}
            </div>

            {/* Items count */}
            <span className="text-[13px] text-[#1a1a1a]">
                {startItem}–{endItem} of {totalItems}
            </span>

            {/* Navigation */}
            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full opacity-30"
                    disabled={!canGoFirst}
                    onClick={() => onPageChange(1)}
                    aria-label="First page"
                >
                    <ChevronFirst className="size-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full opacity-30"
                    disabled={!canGoPrev}
                    onClick={() => onPageChange(currentPage - 1)}
                    aria-label="Previous page"
                >
                    <ChevronLeft className="size-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full"
                    disabled={!canGoNext}
                    onClick={() => onPageChange(currentPage + 1)}
                    aria-label="Next page"
                >
                    <ChevronRight className="size-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-8 rounded-full"
                    disabled={!canGoLast}
                    onClick={() => onPageChange(totalPages)}
                    aria-label="Last page"
                >
                    <ChevronLast className="size-5" />
                </Button>
            </div>
        </div>
    );
}