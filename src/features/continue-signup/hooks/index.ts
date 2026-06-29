/**
 * Continue Sign Up Feature Hooks
 * Helper hooks for currency filtering and selection
 */

import { useMemo } from "react";
import type { Currency } from "../types";

/**
 * Hook to filter currencies based on search query
 */
export function useFilteredCurrencies(
  currencies: Currency[],
  searchQuery: string
): Currency[] {
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
  }, [currencies, searchQuery]);
}

/**
 * Hook to get selected currency details
 */
export function useSelectedCurrency(
  currencies: Currency[],
  currencyCode: string
): Currency | undefined {
  return useMemo(() => {
    return currencies.find((c) => c.code === currencyCode);
  }, [currencies, currencyCode]);
}