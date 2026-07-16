"use client";

import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../services/language.service";

interface UseLanguagesOptions {
    search?: string;
    enabled?: boolean;
}

export function useLanguages(options: UseLanguagesOptions = {}) {
    const { search, enabled = true } = options;

    return useQuery({
        queryKey: ["languages", { search }],
        queryFn: () => getLanguages({ search }),
        enabled,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}