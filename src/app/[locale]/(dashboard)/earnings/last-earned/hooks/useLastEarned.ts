"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchLastEarned } from "../services/earnings.service";

export function useLastEarned(recordId: string) {
    return useQuery({
        queryKey: ["earnings", "last-earned", recordId],
        queryFn: () => fetchLastEarned(recordId),
        enabled: !!recordId,
    });
}