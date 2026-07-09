"use client";

import { useQuery } from "@tanstack/react-query";
import { getReservation } from "../services/reservations.service";
import { READ_RESERVATION_CONFIG } from "../config/reservations.config";

export function useReservation(id: string) {
    return useQuery({
        queryKey: ["reservation", id],
        queryFn: () => getReservation(id, READ_RESERVATION_CONFIG),
        enabled: Boolean(id),
    });
}