"use client";

import { useQuery } from "@tanstack/react-query";
import { getReferRestaurantData } from "../services/refer-restaurant.service";

/**
 * Hook to fetch referral restaurant data.
 * Returns commission earned, referrals count, and currency info.
 */
export function useReferRestaurant(recordId: string) {
    return useQuery({
        queryKey: ["refer-restaurant", recordId],
        queryFn: () => getReferRestaurantData(recordId),
        enabled: !!recordId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}