"use client";

import { useQuery } from "@tanstack/react-query";
import { getReservationsList } from "../services/reservations.service";
import { DEFAULT_PAGE_SIZE } from "../config/reservations.config";
import type { ReservationFilters } from "../types/reservations.types";

interface UseReservationsListParams {
    page: number;
    pageLimit?: number;
    filters?: ReservationFilters;
    enabled?: boolean;
}

export function useReservationsList({
    page,
    pageLimit = DEFAULT_PAGE_SIZE,
    filters,
    enabled = true,
}: UseReservationsListParams) {
    return useQuery({
        queryKey: ["reservations", "list", page, pageLimit, filters],
        queryFn: () =>
            getReservationsList({
                page,
                pageLimit,
                search: filters?.search,
                status: filters?.status,
                date: filters?.date ?? undefined,
            }),
        enabled,
        placeholderData: (previousData) => previousData,
    });
}