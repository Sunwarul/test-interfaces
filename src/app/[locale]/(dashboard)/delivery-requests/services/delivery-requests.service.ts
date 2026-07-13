import { apiClient } from "@/lib/apiClient";
import { READ_DELIVERY_REQUEST_CONFIG } from "../config/delivery-requests.config";
import type { DeliveryRequestResponse } from "../types/delivery-requests.types";

/**
 * Fetch a single delivery request by ID.
 * From API Guide Step 1 (read endpoint).
 */
export async function getDeliveryRequestById(id: string) {
    const response = await apiClient.get<DeliveryRequestResponse>(
        `/entities/read/${id}`,
        {
            params: {
                ...READ_DELIVERY_REQUEST_CONFIG,
            },
        }
    );
    return response.data;
}