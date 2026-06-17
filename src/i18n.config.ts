export const locales = ["en", "ar"] as const;

export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "Arabic",
} as const;

export type Locale = (typeof locales)[number];
