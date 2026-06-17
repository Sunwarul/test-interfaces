import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  // ---------------------------------------------------------------------------
  // Messages are defined inline here as a starting point.
  // Replace with an API or JSON file fetch when translations are ready.
  //
  // Example API fetch (uncomment when ready):
  //
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/translations/${locale}`,
  //     { cache: "no-store" }
  //   );
  //   if (!response.ok) throw new Error(`Translation fetch failed: ${locale}`);
  //   const messages = await response.json();
  // ---------------------------------------------------------------------------
  const messages = {
    common: {
      appName: "Next Template",
      welcome: "Welcome",
      loading: "Loading...",
      error: "An error occurred",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      back: "Back",
    },
    nav: {
      dashboard: "Dashboard",
      login: "Login",
      logout: "Logout",
      settings: "Settings",
    },
    demo: {
      title: "next-intl is working!",
      description:
        "This page demonstrates locale detection, RTL support, and message loading.",
      currentLocale: "Current locale",
      switchLocale: "Switch locale",
      switchTo: "Switch to {locale}",
    },
  };

  return {
    locale,
    messages,
  };
});
