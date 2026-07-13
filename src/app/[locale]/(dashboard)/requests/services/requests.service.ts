import { apiClient } from "@/lib/apiClient";
import { READ_REQUEST_CONFIG } from "../config/requests.config";
import type { RequestDetailResponse } from "../types/requests.types";

/**
 * Fetch a single request by ID.
 * From API Guide Step 1 (read single record).
 */
export async function getRequestById(id: string) {
    const response = await apiClient.get<RequestDetailResponse>(
        `/entities/read/${id}`,
        {
            params: {
                ...READ_REQUEST_CONFIG,
            },
        }
    );
    return response.data;
}