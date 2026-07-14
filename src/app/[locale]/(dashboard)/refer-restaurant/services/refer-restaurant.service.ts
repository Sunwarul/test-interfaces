import { apiClient } from "@/lib/apiClient";
import { REFER_RESTAURANT_CONFIG } from "../config/refer-restaurant.config";
import type { ReferRestaurantResponse } from "../types/refer-restaurant.types";

/**
 * Fetch referral restaurant data by ID.
 * Returns commission earned, referrals count, and currency info.
 */
export async function getReferRestaurantData(recordId: string) {
    const response = await apiClient.get<ReferRestaurantResponse>(
        `/entities/read/${recordId}`,
        {
            params: {
                ...REFER_RESTAURANT_CONFIG,
            },
        }
    );
    return response.data;
}