/**
 * Continue Sign Up Feature Services
 * API calls using shared apiClient pattern
 */

import { CONTINUE_SIGNUP_CONFIG } from "../config";
import type { EntityReadParams, EntityReadResponse } from "../types";

/**
 * Fetch entity record by ID
 * GET /entities/read/{id}
 */
export async function fetchEntity(
  id: string,
  params?: Partial<EntityReadParams>
): Promise<EntityReadResponse> {
  const queryParams: EntityReadParams = {
    component_id: params?.component_id ?? CONTINUE_SIGNUP_CONFIG.componentId,
    module_id: params?.module_id ?? CONTINUE_SIGNUP_CONFIG.moduleId,
    section_id: params?.section_id ?? CONTINUE_SIGNUP_CONFIG.sectionId,
    interface_id: params?.interface_id ?? CONTINUE_SIGNUP_CONFIG.interfaceId,
    brand_service_id: params?.brand_service_id ?? CONTINUE_SIGNUP_CONFIG.brandServiceId,
    project_id: params?.project_id ?? CONTINUE_SIGNUP_CONFIG.projectId,
  };

  const searchParams = new URLSearchParams();
  Object.entries(queryParams).forEach(([key, value]) => {
    searchParams.append(key, value);
  });

  const url = `/entities/read/${id}?${searchParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * Query key factory for React Query
 */
export const CONTINUE_SIGNUP_QUERY_KEYS = {
  entity: (id: string) => ["continue-signup", "entity", id] as const,
} as const;