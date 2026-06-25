/**
 * Continue Sign Up Feature Types
 * Fleet Manager registration form with Validate API integration
 */

export interface Currency {
  code: string;
  name: string;
}

export interface ContinueSignUpFormValues {
  firstName: string;
  lastName: string;
  currency: string;
}

export interface ContinueSignUpState {
  firstName: string;
  lastName: string;
  currency: string;
  isCurrencyModalVisible: boolean;
  currencySearchQuery: string;
  errors: {
    firstName?: string;
    lastName?: string;
    currency?: string;
  };
  isSubmitting: boolean;
  isLoading: boolean;
  entityIds: EntityIds;
}

export interface ContinueSignUpActions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setCurrency: (value: string) => void;
  setCurrencyModalVisible: (visible: boolean) => void;
  setCurrencySearchQuery: (query: string) => void;
  setError: (field: keyof ContinueSignUpState["errors"], message: string | undefined) => void;
  clearErrors: () => void;
  setSubmitting: (submitting: boolean) => void;
  setLoading: (loading: boolean) => void;
  setEntityIds: (ids: EntityIds) => void;
  reset: () => void;
}

export type ContinueSignUpStore = ContinueSignUpState & ContinueSignUpActions;

/**
 * Entity IDs from /entities/list API response
 */
export interface EntityIds {
  componentId?: string;
  moduleId?: string;
  sectionId?: string;
  brandServiceId?: string;
  interfaceId?: string;
}

/**
 * API Response Types
 */
export interface EntityListItem {
  project_id: string;
  component_id: string;
  module_id: string;
  section_id: string;
  brand_service_id: string;
  interface_id: string;
}

export interface EntityListResponse {
  success: boolean;
  message: string;
  data: EntityListItem[];
  cached: boolean;
  execution_time: number;
  current_page: number;
  items_per_page: number;
  total: number;
  page_items: number;
  last_page: number;
}

export interface ValidateCheck {
  field: string;
  value: string;
}

export interface ValidateMainRecord {
  id: string;
  endpoint_id: string;
  table_name: string;
}

export interface ValidateResponse {
  success: boolean;
  message: string;
  data: {
    main: ValidateMainRecord;
    related: Record<string, unknown>;
  };
}