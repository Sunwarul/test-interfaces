/**
 * Continue Sign Up Feature Types
 * Fleet Manager registration form
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
  reset: () => void;
}

export type ContinueSignUpStore = ContinueSignUpState & ContinueSignUpActions;