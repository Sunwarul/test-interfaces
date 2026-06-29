/**
 * Continue Sign Up Feature Types
 * Fleet Manager registration form with Read API integration
 */

/**
 * Currency type for dropdown selection
 */
export interface Currency {
  code: string;
  name: string;
}

/**
 * Form values for Continue Sign Up
 */
export interface ContinueSignUpFormValues {
  firstName: string;
  lastName: string;
  currency: string;
}

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
 * API Response Types from /entities/read endpoint
 */
export interface EntityMainRecord {
  id: string;
  [key: string]: unknown;
}

export interface EntityDatasets {
  [key: string]: unknown;
}

export interface EntityEnum {
  [key: string]: { value: string; label: string }[];
}

export interface EntityReadResponse {
  success: boolean;
  message: string;
  data: {
    main: EntityMainRecord;
    datasets: EntityDatasets;
    enum: EntityEnum;
  };
}

/**
 * API Query params for /entities/read
 */
export interface EntityReadParams {
  component_id: string;
  module_id: string;
  section_id: string;
  interface_id: string;
  brand_service_id: string;
  project_id: string;
}