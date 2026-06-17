"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    type SortingState,
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataPagination } from "@/components/shared/DataPagination";
import { DebouncedSearchInput } from "@/components/shared/DebouncedSearchInput";
import { EmptyState } from "@/components/shared/EmptyState";
import { ErrorState } from "@/components/shared/ErrorState";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog";
import { ReservationsFilters } from "./ReservationsFilters";
import { getReservationsColumns } from "./ReservationsColumns";
import { ReservationDetailPopup } from "./ReservationDetailPopup";
import { useReservationsList } from "../hooks/useReservationsList";
import { useConfirmReservation } from "../hooks/useConfirmReservation";
import { useRejectReservation } from "../hooks/useRejectReservation";
import { useDeleteReservation } from "../hooks/useDeleteReservation";
import { normalizeEnum, safeArray } from "@/lib/utils";
import { DEFAULT_PAGE_SIZE } from "../config/reservations.config";
import type { ReservationItem, ReservationFilters as FiltersType } from "../types/reservations.types";

export function ReservationsPage() {
    const t = useTranslations();
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL-driven state
    const page = Number(searchParams.get("page") ?? "1");
    const pageLimit = Number(searchParams.get("page_limit") ?? String(DEFAULT_PAGE_SIZE));
    const search = searchParams.get("search") ?? "";
    const status = searchParams.get("status") ?? "all";
    const date = searchParams.get("date") ?? "";

    // Local UI state
    const [filters, setFilters] = useState<FiltersType>({ search, status, date });
    const [sorting, setSorting] = useState<SortingState>([]);
    const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [reservationToDelete, setReservationToDelete] = useState<ReservationItem | null>(null);

    // Mutations
    const confirmMutation = useConfirmReservation();
    const rejectMutation = useRejectReservation();
    const deleteMutation = useDeleteReservation();

    // Update URL params
    const updateParams = useCallback(
        (updates: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(updates).forEach(([key, value]) => {
                if (value === null || value === "" || value === "all") {
                    params.delete(key);
                } else {
                    params.set(key, value);
                }
            });
            // Reset to page 1 when filters change
            if ("search" in updates || "status" in updates || "date" in updates) {
                params.set("page", "1");
            }
            router.replace(`?${params.toString()}`, { scroll: false });
        },
        [router, searchParams]
    );

    // Fetch data
    const { data, isLoading, isError, refetch } = useReservationsList({
        page,
        pageLimit,
        filters,
    });

    // Normalize status options
    const statusEnum = data?.data?.enum?.status;
    const statusOptions = [
        { value: "all", label: "All" },
        ...normalizeEnum(statusEnum),
    ];

    // Handlers
    const handleFiltersChange = (newFilters: FiltersType) => {
        setFilters(newFilters);
        updateParams({
            search: newFilters.search || null,
            status: newFilters.status || null,
            date: newFilters.date || null,
        });
    };

    const handlePageChange = (newPage: number) => {
        updateParams({ page: String(newPage) });
    };

    const handlePageSizeChange = (newSize: number) => {
        updateParams({ page_limit: String(newSize), page: "1" });
    };

    const handleView = (reservation: ReservationItem) => {
        setSelectedReservationId(reservation.id);
        setDetailOpen(true);
    };

    const handleEdit = (reservation: ReservationItem) => {
        router.push(`/reservations/edit/${reservation.id}`);
    };

    const handleConfirm = (reservation: ReservationItem) => {
        confirmMutation.mutate({ id: reservation.id });
    };

    const handleReject = (reservation: ReservationItem) => {
        rejectMutation.mutate({ id: reservation.id });
    };

    const handleDeleteClick = (reservation: ReservationItem) => {
        setReservationToDelete(reservation);
        setDeleteOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (reservationToDelete) {
            deleteMutation.mutate(
                { id: reservationToDelete.id },
                {
                    onSuccess: () => {
                        setDeleteOpen(false);
                        setReservationToDelete(null);
                    },
                }
            );
        }
    };

    const handleAddReservation = () => {
        router.push("/reservations/create");
    };

    const handleResetFilters = () => {
        setFilters({ search: "", status: "all", date: "" });
        updateParams({ search: null, status: null, date: null, page: "1" });
    };

    // Table columns
    const columns = getReservationsColumns({
        onView: handleView,
        onEdit: handleEdit,
        onConfirm: handleConfirm,
        onReject: handleReject,
        isConfirming: (id) => confirmMutation.isPending,
        isRejecting: (id) => rejectMutation.isPending,
    });

    const tableData = safeArray<ReservationItem>(data?.data?.items);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        manualPagination: true,
        state: { sorting },
        onSortingChange: setSorting,
    });

    // Pagination meta
    const totalItems = data?.total ?? 0;
    const totalPages = data?.last_page ?? 1;

    return (
        <div className="flex flex-col gap-6">
            {/* Page Title */}
            <div className="flex items-center justify-between px-6">
                <h1 className="text-[32px] font-bold text-[#1a1a1a] tracking-[-0.96px] leading-10">
                    Reservations
                </h1>
            </div>

            {/* Main Card */}
            <div className="rounded-2xl border border-black/10 bg-white/60 overflow-hidden">
                {/* Filters */}
                <ReservationsFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    statusOptions={statusOptions}
                    onAddReservation={handleAddReservation}
                />

                {/* Table */}
                <div className="w-full">
                    {isLoading ? (
                        <TableSkeleton rows={pageLimit} columns={6} />
                    ) : isError ? (
                        <ErrorState
                            onRetry={refetch}
                            className="min-h-[300px]"
                        />
                    ) : tableData.length === 0 ? (
                        <EmptyState
                            title="No reservations found"
                            description="Try adjusting your filters or create a new reservation."
                            action={
                                filters.search || filters.status !== "all" || filters.date
                                    ? {
                                          label: "Reset Filters",
                                          onClick: handleResetFilters,
                                      }
                                    : undefined
                            }
                            className="min-h-[300px]"
                        />
                    ) : (
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                style={{ width: header.getSize() }}
                                                className="h-12 bg-black/5 border-b border-black/10"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column.columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        className="h-16 border-b border-black/10 bg-white/60 hover:bg-white/80 transition-colors"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                {/* Pagination */}
                {!isLoading && !isError && totalItems > 0 && (
                    <DataPagination
                        currentPage={page}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        pageSize={pageLimit}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                )}
            </div>

            {/* Detail Popup */}
            <ReservationDetailPopup
                reservationId={selectedReservationId}
                open={detailOpen}
                onOpenChange={setDetailOpen}
            />

            {/* Delete Confirmation */}
            <ConfirmDeleteDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                onConfirm={handleDeleteConfirm}
                title="Delete Reservation"
                description="Are you sure you want to delete this reservation? This action cannot be undone."
                isDeleting={deleteMutation.isPending}
            />
        </div>
    );
}