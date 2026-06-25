import type { Currency } from "../types";

/**
 * Currency list from Figma design
 * Default selected: DZD (Algerian Dinar)
 */
export const currencies: Currency[] = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "ALL", name: "Albanian Lek" },
  { code: "DZD", name: "Algerian Dinar" },
  { code: "AOA", name: "Angolan Kwanza" },
  { code: "XCD", name: "Eastern Caribbean Dollar" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "AMD", name: "Armenian Dram" },
  { code: "AWG", name: "Aruban Florin" },
  { code: "AUD", name: "Australia Dollar" },
  { code: "AZN", name: "Azerbaijan Manat" },
];

/**
 * Default selected currency (matches Figma design state)
 */
export const DEFAULT_CURRENCY = "DZD";

/**
 * Form placeholder texts
 */
export const PLACEHOLDERS = {
  firstName: "Enter first name",
  lastName: "Enter last name",
  currency: "Select currency",
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  firstNameRequired: "Please enter your first name",
  lastNameRequired: "Please enter your last name",
  currencyRequired: "Please select a currency",
} as const;

/**
 * Screen texts
 */
export const SCREEN_TEXTS = {
  title: "Continue Signing Up",
  description: "Please enter your name as it appears on your ID or passport",
  submitButton: "Continue as a Fleet Manager",
  currencyModalTitle: "Select Currency",
  searchPlaceholder: "Search currency",
} as const;