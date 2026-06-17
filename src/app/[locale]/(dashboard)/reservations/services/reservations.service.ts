import { apiClient } from "@/lib/apiClient";
import {
    LIST_RESERVATIONS_CONFIG,
    RESERVATIONS_ROUTING_CONFIG,
    READ_RESERVATIONS_CONFIG,
} from "../config/reservations.config";
import type {
    ReservationsListResponse,
    InterfaceRoutingResponse,
    ReservationDetailResponse,
} from "../types/reservations.types";

/**
 * Resolve interface routing IDs from design_id.
 * Step 1 of the API guide.
 */
export async function resolveInterfaceRouting() {
    const response = await apiClient.get<InterfaceRoutingResponse>(
        "/entities/list",
        {
            params: {
                project_id: RESERVATIONS_ROUTING_CONFIG.project_id,
                design_id: RESERVATIONS_ROUTING_CONFIG.design_id,
            },
        }
    );
    return response.data;
}

/**
 * Fetch reservations list with pagination, search, and filters.
 * Step 2 of the API guide.
 */
export async function getReservationsList(params: {
    page: number;
    pageLimit: number;
    search?: string;
    status?: string;
    date?: string;
}) {
    const { page, pageLimit, search, status, date } = params;

    // Build filter params
    const filterParams: Record<string, string> = {};
    if (status && status !== "all") {
        filterParams["fk[0][field]"] = "status";
        filterParams["fk[0][operator]"] = "=";
        filterParams["fk[0][value]"] = status;
    }
    if (date) {
        filterParams["fk[1][field]"] = "date";
        filterParams["fk[1][operator]"] = "=";
        filterParams["fk[1][value]"] = date;
    }

    const response = await apiClient.get<ReservationsListResponse>(
        "/entities/list",
        {
            params: {
                ...LIST_RESERVATIONS_CONFIG,
                page,
                page_limit: pageLimit,
                search: search || undefined,
                ...filterParams,
            },
        }
    );
    return response.data;
}

/**
 * Fetch a single reservation by ID.
 * Step 1 of the API guide (read endpoint).
 */
export async function getReservationById(id: string) {
    const response = await apiClient.get<ReservationDetailResponse>(
        `/entities/read/${id}`,
        {
            params: {
                ...READ_RESERVATIONS_CONFIG,
            },
        }
    );
    return response.data;
}