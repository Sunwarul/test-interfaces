"use client";

import { useQuery } from "@tanstack/react-query";
import { getDeliveryRequestById } from "../services/delivery-requests.service";

interface UseDeliveryRequestParams {
    id: string | null;
    enabled?: boolean;
}

export function useDeliveryRequest({
    id,
    enabled = true,
}: UseDeliveryRequestParams) {
    return useQuery({
        queryKey: ["delivery-requests", "detail", id],
        queryFn: () => getDeliveryRequestById(id!),
        enabled: enabled && id !== null,
        placeholderData: (previousData) => previousData,
    });
}