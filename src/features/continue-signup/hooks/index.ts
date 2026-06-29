/**
 * Continue Sign Up Feature Hooks
 * React Query hooks for API operations
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEntity, validateEntity, CONTINUE_SIGNUP_QUERY_KEYS } from "../services";
import type {
  ContinueSignUpFormValues,
  EntityCreateResponse,
  EntityValidateBody,
  EntityValidateResponse,
} from "../types";

/**
 * Hook to validate entity fields
 */
export function useValidateEntity() {
  const queryClient = useQueryClient();

  return useMutation<
    EntityValidateResponse,
    Error,
    EntityValidateBody
  >({
    mutationFn: (body: EntityValidateBody) => validateEntity(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CONTINUE_SIGNUP_QUERY_KEYS.validate,
      });
    },
  });
}

/**
 * Hook to create a new entity record
 */
export function useCreateEntity() {
  const queryClient = useQueryClient();

  return useMutation<
    EntityCreateResponse,
    Error,
    ContinueSignUpFormValues
  >({
    mutationFn: (values: ContinueSignUpFormValues) =>
      createEntity({
        firstName: values.firstName,
        lastName: values.lastName,
        currency: values.currency,
      }),
    onSuccess: () => {
      // Invalidate any list queries if needed
      queryClient.invalidateQueries({
        queryKey: CONTINUE_SIGNUP_QUERY_KEYS.create,
      });
    },
  });
}

/**
 * Hook to filter currencies based on search query
 */
export function useFilteredCurrencies<T extends { code: string; name: string }>(
  currencies: T[],
  searchQuery: string
): T[] {
  const filtered = currencies.filter((currency) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      currency.code.toLowerCase().includes(query) ||
      currency.name.toLowerCase().includes(query)
    );
  });
  return filtered;
}

/**
 * Hook to get selected currency details
 */
export function useSelectedCurrency<T extends { code: string; name: string }>(
  currencies: T[],
  currencyCode: string
): T | undefined {
  return currencies.find((c) => c.code === currencyCode);
}