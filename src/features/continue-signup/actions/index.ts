import { z } from "zod";
import type { ContinueSignUpFormValues } from "../types";
import { useContinueSignUpStore } from "../store";
import { ERROR_MESSAGES } from "../mocks/fixtures";

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
 * Submit form handler
 */
export async function submitForm(values: ContinueSignUpFormValues): Promise<boolean> {
  const store = useContinueSignUpStore.getState();
  
  if (!validateForm(values)) {
    return false;
  }

  store.setSubmitting(true);

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In production, this would call the actual API
    console.log("Form submitted:", values);
    
    return true;
  } catch (error) {
    console.error("Form submission error:", error);
    return false;
  } finally {
    store.setSubmitting(false);
  }
}