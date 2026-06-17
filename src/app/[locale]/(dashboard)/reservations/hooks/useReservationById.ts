"use client";

import { useQuery } from "@tanstack/react-query";
import { getReservationById } from "../services/reservations.service";

interface UseReservationByIdParams {
    id: string | null;
    enabled?: boolean;
}

export function useReservationById({
    id,
    enabled = true,
}: UseReservationByIdParams) {
    return useQuery({
        queryKey: ["reservations", "detail", id],
        queryFn: () => getReservationById(id!),
        enabled: enabled && id !== null,
        placeholderData: (previousData) => previousData,
    });
}