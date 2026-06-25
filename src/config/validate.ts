/**
 * Validate Service API Configuration
 * From Interface API Guide
 */

export const VALIDATE_CONFIG = {
  projectId: "68cbaab11eebc9ff240895c6",
  designId: "21109:28587",
  serviceType: "validate",
  pageLimit: 15,
  page: 1,
} as const;

/**
 * Entity IDs will be populated after calling /entities/list
 * These are used for subsequent validate requests
 */
export interface ValidateEntityIds {
  componentId?: string;
  moduleId?: string;
  sectionId?: string;
  brandServiceId?: string;
  interfaceId?: string;
}

/**
 * Default empty entity IDs
 */
export const EMPTY_ENTITY_IDS: ValidateEntityIds = {
  componentId: undefined,
  moduleId: undefined,
  sectionId: undefined,
  brandServiceId: undefined,
  interfaceId: undefined,
};