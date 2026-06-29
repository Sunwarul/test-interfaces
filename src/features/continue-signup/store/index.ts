/**
 * Continue Sign Up Feature Store
 * Client-only UI state (NO server state)
 */

import { create } from "zustand";
import type { ContinueSignUpUIStore, ContinueSignUpUIState } from "../types";

const initialState: ContinueSignUpUIState = {
  firstName: "",
  lastName: "",
  currency: "",
  isCurrencyModalVisible: false,
  currencySearchQuery: "",
};

export const useContinueSignUpStore = create<ContinueSignUpUIStore>((set) => ({
  ...initialState,

  setFirstName: (value: string) => set({ firstName: value }),

  setLastName: (value: string) => set({ lastName: value }),

  setCurrency: (value: string) =>
    set({
      currency: value,
      isCurrencyModalVisible: false,
    }),

  setCurrencyModalVisible: (visible: boolean) =>
    set({
      isCurrencyModalVisible: visible,
      currencySearchQuery: visible ? "" : "",
    }),

  setCurrencySearchQuery: (query: string) => set({ currencySearchQuery: query }),

  reset: () => set(initialState),
}));