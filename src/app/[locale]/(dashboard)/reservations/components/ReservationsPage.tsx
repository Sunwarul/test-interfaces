"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ReservationsFilters } from "./ReservationsFilters";
import { ReservationsTable, type ReservationRow } from "./ReservationsTable";
import { ReservationDetailPopup } from "./ReservationDetailPopup";
import { useReservation } from "../hooks/useReservation";
import { toast } from "sonner";

interface ReservationsPageProps {
    initialData?: ReservationRow[];
}

// Mock data for demonstration
const MOCK_DATA: ReservationRow[] = [
    {
        id: "1",
        number: 213,
        date: "May 23, 2024",
        time: "14:00",
        guests: 4,
        status: 0,
        name: "John Doe",
        phone: "+44 123 456 78 90",
        email: "john@example.com",
        occasion: "Birthday",
        tableNo: "101",
        feedbackID: "400",
        couponCode: "BIRTHDAY20",
        additionalInformation: "Window seat preferred",
    },
    {
        id: "2",
        number: 212,
        date: "May 23, 2024",
        time: "16:30",
        guests: 1,
        status: 2,
        name: "Jane Smith",
        phone: "+44 987 654 32 10",
        email: "jane@example.com",
        occasion: undefined,
        tableNo: "102",
        feedbackID: "399",
        couponCode: undefined,
        additionalInformation: undefined,
    },
    {
        id: "3",
        number: 210,
        date: "May 23, 2024",
        time: "18:00",
        guests: 11,
        status: 1,
        name: "Mike Johnson",
        phone: "+44 555 123 45 67",
        email: "mike@example.com",
        occasion: "Anniversary",
        tableNo: "103",
        feedbackID: "398",
        couponCode: "ANNIV10",
        additionalInformation: "Vegetarian options needed",
    },
    {
        id: "4",
        number: 209,
        date: "May 23, 2024",
        time: "18:00",
        guests: 8,
        status: 3,
        name: "Sarah Williams",
        phone: "+44 777 888 99 00",
        email: "sarah@example.com",
        occasion: "Business",
        tableNo: "104",
        feedbackID: "397",
        couponCode: undefined,
        additionalInformation: undefined,
    },
];

export function ReservationsPage({ initialData }: ReservationsPageProps) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [date, setDate] = useState<Date | null>(null);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedReservation, setSelectedReservation] =
        useState<ReservationRow | null>(null);
    const [detailPopupOpen, setDetailPopupOpen] = useState(false);

    // Fetch reservation details when a row is selected
    const { data: reservationDetail, isLoading: isLoadingDetail } =
        useReservation(selectedReservation?.id || "");

    const handleView = useCallback((reservation: ReservationRow) => {
        setSelectedReservation(reservation);
        setDetailPopupOpen(true);
    }, []);

    const handleEdit = useCallback((reservation: ReservationRow) => {
        toast.info(`Edit reservation #${reservation.number}`);
        // TODO: Navigate to edit page
    }, []);

    const handleConfirm = useCallback((reservation: ReservationRow) => {
        toast.success(`Reservation #${reservation.number} confirmed`);
        // TODO: Call API to confirm
    }, []);

    const handleReject = useCallback((reservation: ReservationRow) => {
        toast.error(`Reservation #${reservation.number} rejected`);
        // TODO: Call API to reject
    }, []);

    const handleAddReservation = useCallback(() => {
        toast.info("Create new reservation");
        // TODO: Navigate to create page
    }, []);

    // Filter data based on search and status
    const filteredData = MOCK_DATA.filter((item) => {
        const matchesSearch =
            search === "" ||
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.number.toString().includes(search);
        const matchesStatus =
            status === "all" ||
            (status === "pending" && item.status === 0) ||
            (status === "confirmed" && item.status === 1) ||
            (status === "cancelled" && item.status === 2) ||
            (status === "expired" && item.status === 3);
        return matchesSearch && matchesStatus;
    });

    // Pagination
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="flex flex-col gap-6">
            {/* Page Title */}
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-black-100)]">
                Reservations
            </h1>

            {/* Main Content Card */}
            <div className="rounded-2xl border border-[var(--border-black-10)] bg-white">
                {/* Filters */}
                <ReservationsFilters
                    search={search}
                    onSearchChange={setSearch}
                    status={status}
                    onStatusChange={setStatus}
                    date={date}
                    onDateChange={setDate}
                    onAddReservation={handleAddReservation}
                />

                {/* Table */}
                <ReservationsTable
                    data={paginatedData}
                    onView={handleView}
                    onEdit={handleEdit}
                    onConfirm={handleConfirm}
                    onReject={handleReject}
                />

                {/* Pagination */}
                <div className="flex items-center justify-between border-t border-[var(--border-black-10)] bg-[var(--background-white-60)] px-6 py-3">
                    {/* Rows per page */}
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[var(--color-text-black-60)]">
                            Rows per page:
                        </span>
                        <Select
                            value={pageSize.toString()}
                            onValueChange={(value) => {
                                setPageSize(Number(value));
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="h-8 w-16 border-0 bg-transparent p-0 font-bold focus:ring-0">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="15">15</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Page info */}
                    <span className="text-sm text-[var(--color-text-black-100)]">
                        {totalItems > 0
                            ? `${startIndex + 1}–${endIndex} of ${totalItems}`
                            : "0 of 0"}
                    </span>

                    {/* Navigation */}
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full"
                            onClick={() => setPage(1)}
                            disabled={page === 1}
                        >
                            <ChevronsLeft className="size-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            <ChevronLeft className="size-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= totalPages}
                        >
                            <ChevronRight className="size-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full"
                            onClick={() => setPage(totalPages)}
                            disabled={page >= totalPages}
                        >
                            <ChevronsRight className="size-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Detail Popup */}
            <ReservationDetailPopup
                isOpen={detailPopupOpen}
                onClose={() => setDetailPopupOpen(false)}
                reservation={selectedReservation}
                isLoading={isLoadingDetail}
            />
        </div>
    );
}