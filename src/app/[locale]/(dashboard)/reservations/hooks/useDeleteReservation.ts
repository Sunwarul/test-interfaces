"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiClient } from "@/lib/apiClient";
import { LIST_RESERVATIONS_CONFIG } from "../config/reservations.config";

interface DeleteReservationParams {
    id: string;
}

async function deleteReservation({ id }: DeleteReservationParams) {
    const response = await apiClient.post(`/entities/delete/${id}`, {
        ...LIST_RESERVATIONS_CONFIG,
    });
    return response.data;
}

export function useDeleteReservation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteReservation,
        onSuccess: () => {
            toast.success("Reservation deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["reservations"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to delete reservation");
        },
    });
}