/**
 * Continue Sign Up Feature Services
 * API calls using shared apiClient pattern
 */

import { apiPost } from "@/utils/api";
import { CONTINUE_SIGNUP_CONFIG } from "../config";
import type {
  EntityCreateBody,
  EntityCreateParams,
  EntityCreateResponse,
  EntityValidateBody,
  EntityValidateParams,
  EntityValidateResponse,
} from "../types";

/**
 * Validate entity fields
 * POST /entities/validate
 */
export async function validateEntity(
  body: EntityValidateBody,
  params?: Partial<EntityValidateParams>
): Promise<EntityValidateResponse> {
  const queryParams: Record<string, string> = {
    component_id: params?.component_id ?? CONTINUE_SIGNUP_CONFIG.componentId,
    module_id: params?.module_id ?? CONTINUE_SIGNUP_CONFIG.moduleId,
    section_id: params?.section_id ?? CONTINUE_SIGNUP_CONFIG.sectionId,
    interface_id: params?.interface_id ?? CONTINUE_SIGNUP_CONFIG.interfaceId,
    brand_service_id:
      params?.brand_service_id ?? CONTINUE_SIGNUP_CONFIG.brandServiceId,
    project_id: params?.project_id ?? CONTINUE_SIGNUP_CONFIG.projectId,
  };

  const response = await apiPost<EntityValidateResponse>(
    "/entities/validate",
    body,
    { params: queryParams }
  );

  return response.data;
}

/**
 * Create entity record
 * POST /entities/create
 */
export async function createEntity(
  body: EntityCreateBody,
  params?: Partial<EntityCreateParams>
): Promise<EntityCreateResponse> {
  const queryParams: Record<string, string> = {
    component_id: params?.component_id ?? CONTINUE_SIGNUP_CONFIG.componentId,
    module_id: params?.module_id ?? CONTINUE_SIGNUP_CONFIG.moduleId,
    section_id: params?.section_id ?? CONTINUE_SIGNUP_CONFIG.sectionId,
    interface_id: params?.interface_id ?? CONTINUE_SIGNUP_CONFIG.interfaceId,
    brand_service_id:
      params?.brand_service_id ?? CONTINUE_SIGNUP_CONFIG.brandServiceId,
    project_id: params?.project_id ?? CONTINUE_SIGNUP_CONFIG.projectId,
  };

  const response = await apiPost<EntityCreateResponse>(
    "/entities/create",
    { data: body },
    { params: queryParams }
  );

  return response.data;
}

/**
 * Query key factory for React Query
 */
export const CONTINUE_SIGNUP_QUERY_KEYS = {
  validate: ["continue-signup", "validate"] as const,
  create: ["continue-signup", "create"] as const,
} as const;