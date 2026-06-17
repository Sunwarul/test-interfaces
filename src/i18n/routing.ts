import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // All supported locales
  locales: ["en", "ar"],

  // Fallback when no locale matches
  defaultLocale: "en",
});
