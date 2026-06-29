/**
 * Continue Sign Up Feature Types
 * Fleet Manager registration form with CREATE API integration
 */

import { z } from "zod";

/**
 * Currency type for dropdown selection
 */
export interface Currency {
  code: string;
  name: string;
}

/**
 * Zod schema for Continue Sign Up form validation
 */
export const continueSignUpSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  currency: z.string().min(1, "Please select a currency"),
});

/**
 * Form values for Continue Sign Up (from react-hook-form)
 */
export type ContinueSignUpFormValues = z.infer<typeof continueSignUpSchema>;

/**
 * Client-only UI state (NOT server state)
 */
export interface ContinueSignUpUIState {
  firstName: string;
  lastName: string;
  currency: string;
  isCurrencyModalVisible: boolean;
  currencySearchQuery: string;
}

/**
 * Client-only UI actions
 */
export interface ContinueSignUpUIActions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setCurrency: (value: string) => void;
  setCurrencyModalVisible: (visible: boolean) => void;
  setCurrencySearchQuery: (query: string) => void;
  reset: () => void;
}

export type ContinueSignUpUIStore = ContinueSignUpUIState & ContinueSignUpUIActions;

/**
 * API Response Types from /entities/create endpoint
 */
export interface EntityCreateMainRecord {
  id: string;
  endpoint_id: string;
  table_name: string;
  [key: string]: unknown;
}

export interface EntityCreateResponse {
  success: boolean;
  message: string;
  data: {
    main: EntityCreateMainRecord;
    related: Record<string, unknown>;
  };
}

/**
 * API Query params for /entities/create
 */
export interface EntityCreateParams {
  component_id: string;
  module_id: string;
  section_id: string;
  interface_id: string;
  brand_service_id: string;
  project_id: string;
}

/**
 * Request body for /entities/create
 */
export interface EntityCreateBody {
  firstName: string;
  lastName: string;
  currency: string;
}