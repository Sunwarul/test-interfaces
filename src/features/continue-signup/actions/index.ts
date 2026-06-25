import { z } from "zod";
import type {
  ContinueSignUpFormValues,
  EntityIds,
  EntityListResponse,
  ValidateResponse,
} from "../types";
import { useContinueSignUpStore } from "../store";
import { ERROR_MESSAGES } from "../mocks/fixtures";
import { apiGet, apiPost } from "@/utils/api";
import { VALIDATE_CONFIG } from "@/config/validate";

/**
 * Zod validation schema for Continue Sign Up form
 */
export const continueSignUpSchema = z.object({
  firstName: z.string().min(1, ERROR_MESSAGES.firstNameRequired),
  lastName: z.string().min(1, ERROR_MESSAGES.lastNameRequired),
  currency: z.string().min(1, ERROR_MESSAGES.currencyRequired),
});

export type ContinueSignUpSchema = z.infer<typeof continueSignUpSchema>;

/**
 * Validate form values against schema
 */
export function validateForm(values: ContinueSignUpFormValues): boolean {
  const store = useContinueSignUpStore.getState();
  store.clearErrors();

  const result = continueSignUpSchema.safeParse(values);

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors;

    if (fieldErrors.firstName) {
      store.setError("firstName", fieldErrors.firstName[0]);
    }
    if (fieldErrors.lastName) {
      store.setError("lastName", fieldErrors.lastName[0]);
    }
    if (fieldErrors.currency) {
      store.setError("currency", fieldErrors.currency[0]);
    }
    return false;
  }

  return true;
}

/**
 * Fetch entity IDs from /entities/list endpoint
 * These IDs are required for subsequent validate requests
 */
export async function fetchEntityIds(): Promise<EntityIds> {
  const store = useContinueSignUpStore.getState();
  store.setLoading(true);

  try {
    const response = await apiGet<EntityListResponse>("/entities/list", {
      params: {
        project_id: VALIDATE_CONFIG.projectId,
        design_id: VALIDATE_CONFIG.designId,
        service_type: VALIDATE_CONFIG.serviceType,
        page_limit: VALIDATE_CONFIG.pageLimit,
        page: VALIDATE_CONFIG.page,
      },
    });

    if (response.success && response.data.data && response.data.data.length > 0) {
      const entity = response.data.data[0];
      const entityIds: EntityIds = {
        componentId: entity.component_id,
        moduleId: entity.module_id,
        sectionId: entity.section_id,
        brandServiceId: entity.brand_service_id,
        interfaceId: entity.interface_id,
      };

      store.setEntityIds(entityIds);
      return entityIds;
    }

    return {};
  } catch (error) {
    console.error("Failed to fetch entity IDs:", error);
    return {};
  } finally {
    store.setLoading(false);
  }
}

/**
 * Validate form data with the API
 * Calls POST /entities/validate with field checks
 */
export async function validateWithApi(
  values: ContinueSignUpFormValues
): Promise<ValidateResponse | null> {
  const store = useContinueSignUpStore.getState();
  const { entityIds } = store;

  // Ensure we have entity IDs
  if (!entityIds.componentId || !entityIds.moduleId || !entityIds.sectionId) {
    console.warn("Entity IDs not available, fetching...");
    const newIds = await fetchEntityIds();
    if (!newIds.componentId) {
      store.setError("firstName", "Unable to connect to validation service");
      return null;
    }
  }

  const currentIds = useContinueSignUpStore.getState().entityIds;

  try {
    const response = await apiPost<ValidateResponse["data"]>(
      "/entities/validate",
      {
        checks: [
          { field: "firstName", value: values.firstName },
          { field: "lastName", value: values.lastName },
        ],
        match_mode: "each",
      },
      {
        params: {
          component_id: currentIds.componentId,
          module_id: currentIds.moduleId,
          section_id: currentIds.sectionId,
          interface_id: currentIds.interfaceId,
          brand_service_id: currentIds.brandServiceId,
          project_id: VALIDATE_CONFIG.projectId,
        },
      }
    );

    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    console.error("Validation API error:", error);
    return null;
  }
}

/**
 * Submit form handler
 */
export async function submitForm(values: ContinueSignUpFormValues): Promise<boolean> {
  const store = useContinueSignUpStore.getState();

  if (!validateForm(values)) {
    return false;
  }

  store.setSubmitting(true);

  try {
    // Validate with API
    const validationResult = await validateWithApi(values);

    if (!validationResult) {
      // API validation failed, but form is valid locally
      // In production, you might want to handle this differently
      console.log("Form validated locally, API validation skipped");
    }

    return true;
  } catch (error) {
    console.error("Form submission error:", error);
    return false;
  } finally {
    store.setSubmitting(false);
  }
}