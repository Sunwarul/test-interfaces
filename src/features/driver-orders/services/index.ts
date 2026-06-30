import { apiClient } from "@/lib/apiClient";
import { DRIVER_ORDERS_CONFIG } from "../config";
import type { DriverOrdersResponse } from "../types";

/**
 * Fetch a single order record by ID
 */
export async function fetchOrderById(id: string): Promise<DriverOrdersResponse> {
  const response = await apiClient.get<DriverOrdersResponse>(
    `/entities/read/${id}`,
    {
      params: {
        component_id: DRIVER_ORDERS_CONFIG.componentId,
        module_id: DRIVER_ORDERS_CONFIG.moduleId,
        section_id: DRIVER_ORDERS_CONFIG.sectionId,
        interface_id: DRIVER_ORDERS_CONFIG.interfaceId,
        brand_service_id: DRIVER_ORDERS_CONFIG.brandServiceId,
        project_id: DRIVER_ORDERS_CONFIG.projectId,
      },
    }
  );
  return response.data;
}

/**
 * Fetch orders list with filters
 * Note: This adapts the read endpoint for list operations
 */
export async function fetchOrders(params?: {
  page?: number;
  limit?: number;
  search?: string;
  startDate?: string;
  endDate?: string;
}): Promise<DriverOrdersResponse> {
  const response = await apiClient.get<DriverOrdersResponse>(
    `/entities/read/list`,
    {
      params: {
        component_id: DRIVER_ORDERS_CONFIG.componentId,
        module_id: DRIVER_ORDERS_CONFIG.moduleId,
        section_id: DRIVER_ORDERS_CONFIG.sectionId,
        interface_id: DRIVER_ORDERS_CONFIG.interfaceId,
        brand_service_id: DRIVER_ORDERS_CONFIG.brandServiceId,
        project_id: DRIVER_ORDERS_CONFIG.projectId,
        ...params,
      },
    }
  );
  return response.data;
}