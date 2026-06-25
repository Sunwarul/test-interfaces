import { create } from "zustand";
import type { ContinueSignUpStore, ContinueSignUpState, EntityIds } from "../types";

const initialState: ContinueSignUpState = {
  firstName: "",
  lastName: "",
  currency: "",
  isCurrencyModalVisible: false,
  currencySearchQuery: "",
  errors: {},
  isSubmitting: false,
  isLoading: false,
  entityIds: {},
};

export const useContinueSignUpStore = create<ContinueSignUpStore>((set) => ({
  ...initialState,

  setFirstName: (value: string) =>
    set((state) => ({
      firstName: value,
      errors: { ...state.errors, firstName: undefined },
    })),

  setLastName: (value: string) =>
    set((state) => ({
      lastName: value,
      errors: { ...state.errors, lastName: undefined },
    })),

  setCurrency: (value: string) =>
    set((state) => ({
      currency: value,
      errors: { ...state.errors, currency: undefined },
      isCurrencyModalVisible: false,
    })),

  setCurrencyModalVisible: (visible: boolean) =>
    set({ isCurrencyModalVisible: visible, currencySearchQuery: visible ? "" : "" }),

  setCurrencySearchQuery: (query: string) => set({ currencySearchQuery: query }),

  setError: (field, message) =>
    set((state) => ({
      errors: { ...state.errors, [field]: message },
    })),

  clearErrors: () => set({ errors: {} }),

  setSubmitting: (submitting: boolean) => set({ isSubmitting: submitting }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  setEntityIds: (ids: EntityIds) => set({ entityIds: ids }),

  reset: () => set(initialState),
}));