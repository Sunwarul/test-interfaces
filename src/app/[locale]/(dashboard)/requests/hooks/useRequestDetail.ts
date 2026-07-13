"use client";

import { useQuery } from "@tanstack/react-query";
import { getRequestById } from "../services/requests.service";

interface UseRequestDetailParams {
    id: string;
    enabled?: boolean;
}

export function useRequestDetail({
    id,
    enabled = true,
}: UseRequestDetailParams) {
    return useQuery({
        queryKey: ["requests", "detail", id],
        queryFn: () => getRequestById(id),
        enabled,
    });
}