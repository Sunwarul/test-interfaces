"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { LIST_RESERVATIONS_CONFIG } from "../config/reservations.config";

interface RejectReservationParams {
    id: string;
}

async function rejectReservation({ id }: RejectReservationParams) {
    const response = await apiClient.post(`/entities/update/${id}`, {
        ...LIST_RESERVATIONS_CONFIG,
        data: { status: "cancelled" },
    });
    return response.data;
}

export function useRejectReservation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rejectReservation,
        onSuccess: () => {
            toast.success("Reservation rejected successfully");
            queryClient.invalidateQueries({ queryKey: ["reservations"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to reject reservation");
        },
    });
}