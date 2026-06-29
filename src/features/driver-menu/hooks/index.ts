import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { driverMenuService } from "../services";
import { DRIVER_MENU_QUERY_KEYS } from "../config";
import type { DriverProfile } from "../types";

export function useDriverProfile(id: string) {
  return useQuery({
    queryKey: [...DRIVER_MENU_QUERY_KEYS.profile, id] as const,
    queryFn: () => driverMenuService.getProfile(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    select: (data) => {
      const main = data.data?.main;
      if (!main) return null;
      return {
        id: main.id,
        name: main.name ?? "John Doe",
        avatar: main.avatar,
        rating: main.rating ?? 4.8,
        reviewCount: main.reviewCount ?? 2148,
      } as DriverProfile;
    },
  });
}

export function useCloneRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => driverMenuService.cloneRecord(id),
    onSuccess: () => {
      // Invalidate profile queries to reflect any changes
      queryClient.invalidateQueries({
        queryKey: DRIVER_MENU_QUERY_KEYS.profile,
      });
    },
  });
}

export function useDeleteRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => driverMenuService.deleteRecord(id),
    onSuccess: () => {
      // Invalidate profile queries to reflect deletion
      queryClient.invalidateQueries({
        queryKey: DRIVER_MENU_QUERY_KEYS.profile,
      });
    },
  });
}