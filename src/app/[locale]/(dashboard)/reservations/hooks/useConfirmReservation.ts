"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { LIST_RESERVATIONS_CONFIG } from "../config/reservations.config";

interface ConfirmReservationParams {
    id: string;
}

async function confirmReservation({ id }: ConfirmReservationParams) {
    const response = await apiClient.post(`/entities/update/${id}`, {
        ...LIST_RESERVATIONS_CONFIG,
        data: { status: "confirmed" },
    });
    return response.data;
}

export function useConfirmReservation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: confirmReservation,
        onSuccess: () => {
            toast.success("Reservation confirmed successfully");
            queryClient.invalidateQueries({ queryKey: ["reservations"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to confirm reservation");
        },
    });
}