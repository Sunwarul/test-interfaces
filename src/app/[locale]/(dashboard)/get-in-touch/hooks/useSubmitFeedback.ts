"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { submitFeedback } from "../services/get-in-touch.service";
import type { GetInTouchFormData } from "../types/get-in-touch.types";

/**
 * Hook to submit feedback form.
 * Handles success/error with toast notifications.
 */
export function useSubmitFeedback() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: GetInTouchFormData) => {
            return submitFeedback({
                questions: formData.questions ?? null,
                details: formData.details ?? null,
                entity_1_type: formData.entity_1_type ?? null,
                entity_1_id: formData.entity_1_id ?? null,
                code: formData.code ?? null,
            });
        },
        onSuccess: () => {
            toast.success("Message sent successfully");
            queryClient.invalidateQueries({ queryKey: ["get-in-touch"] });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Failed to send message");
        },
    });
}