import { useQuery } from "@tanstack/react-query";
import { fetchOrderById, fetchOrders } from "../services";
import { DRIVER_ORDERS_QUERY_KEYS } from "../config";
import type { OrderFilters } from "../types";

/**
 * Hook to fetch a single order by ID
 */
export function useOrder(id: string) {
  return useQuery({
    queryKey: DRIVER_ORDERS_QUERY_KEYS.detail(id),
    queryFn: () => fetchOrderById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to fetch orders list with filters
 */
export function useOrders(filters?: Partial<OrderFilters>) {
  return useQuery({
    queryKey: [
      ...DRIVER_ORDERS_QUERY_KEYS.list(),
      filters?.period,
      filters?.searchQuery,
      filters?.dateRange,
    ],
    queryFn: () =>
      fetchOrders({
        search: filters?.searchQuery,
        startDate: filters?.dateRange?.start.toISOString(),
        endDate: filters?.dateRange?.end.toISOString(),
      }),
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
}