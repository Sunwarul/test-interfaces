import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrderById, fetchOrders, cloneOrder, deleteOrder } from "../services";
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

/**
 * Hook to clone an order record
 */
export function useCloneOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cloneOrder(id),
    onSuccess: (_data, id) => {
      // Invalidate the list query to refresh data after cloning
      queryClient.invalidateQueries({
        queryKey: DRIVER_ORDERS_QUERY_KEYS.list(),
      });
      // Invalidate the specific order detail if needed
      queryClient.invalidateQueries({
        queryKey: DRIVER_ORDERS_QUERY_KEYS.detail(id),
      });
    },
  });
}

/**
 * Hook to delete an order record
 */
export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOrder(id),
    onSuccess: (_data, id) => {
      // Invalidate the list query to refresh data after deletion
      queryClient.invalidateQueries({
        queryKey: DRIVER_ORDERS_QUERY_KEYS.list(),
      });
      // Invalidate the specific order detail if it exists
      queryClient.invalidateQueries({
        queryKey: DRIVER_ORDERS_QUERY_KEYS.detail(id),
      });
    },
  });
}