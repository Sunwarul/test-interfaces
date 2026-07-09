"use client";

import { useQuery } from "@tanstack/react-query";
import { getRequestBody } from "../services/get-in-touch.service";

/**
 * Hook to fetch form schema for Get in Touch screen.
 * Returns fields, enum, and datasets for rendering the form.
 */
export function useGetInTouchRequestBody() {
    return useQuery({
        queryKey: ["get-in-touch", "request-body"],
        queryFn: getRequestBody,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}