import { z } from "zod";

// Reservation item from API
export interface ReservationItem {
    index: number;
    id: string;
    guests: number;
    status: string;
    date: string;
    time: string;
}

// Status enum from API
export type ReservationStatus =
    | "pending"
    | "confirmed"
    | "request_expired"
    | "cancelled";

// Normalized status option
export interface StatusOption {
    value: ReservationStatus;
    label: string;
}

// API response types
export interface ReservationsListResponse {
    success: boolean;
    message: string;
    data: {
        items: ReservationItem[];
        enum: {
            status: Record<string, ReservationStatus>;
        };
        datasets: Record<string, unknown>;
    };
    current_page: number;
    items_per_page: number;
    total: number;
    page_items: number;
    last_page: number;
}

export interface InterfaceRoutingResponse {
    success: boolean;
    message: string;
    data: Array<{
        project_id: string;
        interface_id: string;
        component_id: string;
        module_id: string;
        section_id: string;
        brand_service_id: string;
    }>;
    current_page: number;
    items_per_page: number;
    total: number;
    page_items: number;
    last_page: number;
}

// Pagination metadata
export interface PaginationMeta {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}

// Filter state
export interface ReservationFilters {
    search: string;
    status: string;
    date: string | null;
}

// Status badge variant mapping
export const STATUS_VARIANT_MAP: Record<ReservationStatus, string> = {
    pending: "pending",
    confirmed: "confirmed",
    request_expired: "request_expired",
    cancelled: "cancelled",
} as const;

// Detail response types
export interface ReservationDetailItem {
    id: string;
    feedbackID: string;
    name: string;
    occasion: string | null;
    additionalInformation: string | null;
    couponCode: string | null;
    numberOfPeople: number;
    status: ReservationStatus;
    reservationDate: string;
    reservationTime: string;
    tableNo: string | null;
    phone?: string;
    email?: string;
}

export interface ReservationDetailResponse {
    success: boolean;
    message: string;
    data: {
        item: ReservationDetailItem;
        enum: {
            status: Record<string, ReservationStatus>;
        };
        datasets: Record<string, unknown>;
    };
    meta: Record<string, unknown>;
    execution_time: number;
    timestamp: string;
}