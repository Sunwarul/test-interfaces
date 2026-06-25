import { useMemo } from "react";
import { useContinueSignUpStore } from "../store";
import { currencies } from "../mocks/fixtures";
import type { Currency, EntityIds } from "../types";

/**
 * Hook to access Continue Sign Up form state and actions
 */
export function useContinueSignUp() {
  const store = useContinueSignUpStore();

  return {
    // State
    firstName: store.firstName,
    lastName: store.lastName,
    currency: store.currency,
    isCurrencyModalVisible: store.isCurrencyModalVisible,
    currencySearchQuery: store.currencySearchQuery,
    errors: store.errors,
    isSubmitting: store.isSubmitting,
    isLoading: store.isLoading,
    entityIds: store.entityIds,

    // Actions
    setFirstName: store.setFirstName,
    setLastName: store.setLastName,
    setCurrency: store.setCurrency,
    setCurrencyModalVisible: store.setCurrencyModalVisible,
    setCurrencySearchQuery: store.setCurrencySearchQuery,
    clearErrors: store.clearErrors,
    setEntityIds: store.setEntityIds,
    reset: store.reset,
  };
}

/**
 * Hook to get filtered currencies based on search query
 */
export function useFilteredCurrencies(): Currency[] {
  const searchQuery = useContinueSignUpStore((state) => state.currencySearchQuery);

  return useMemo(() => {
    if (!searchQuery.trim()) {
      return currencies;
    }

    const query = searchQuery.toLowerCase();
    return currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(query) ||
        currency.name.toLowerCase().includes(query)
    );
  }, [searchQuery]);
}

/**
 * Hook to get selected currency details
 */
export function useSelectedCurrency(): Currency | undefined {
  const currencyCode = useContinueSignUpStore((state) => state.currency);

  return useMemo(() => {
    return currencies.find((c) => c.code === currencyCode);
  }, [currencyCode]);
}

/**
 * Hook to get entity IDs
 */
export function useEntityIds(): EntityIds {
  return useContinueSignUpStore((state) => state.entityIds);
}