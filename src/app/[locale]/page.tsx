"use client";

// Demo page: shows next-intl is wired correctly.
// Uses useTranslations (client) — replace with server-side getTranslations() when needed.
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function DemoPage() {
  const t = useTranslations("demo");
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const locale = useLocale();


  const otherLocale = locale === "en" ? "ar" : "en";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8 font-sans">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-700">
          ✓ {tCommon("appName")}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {t("title")}
        </h1>
        <p className="max-w-md text-gray-500">{t("description")}</p>
      </div>

      {/* Info cards */}
      <div className="grid gap-4 sm:grid-cols-2 w-full max-w-lg">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {t("currentLocale")}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{locale}</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            {t("switchLocale")}
          </p>
          <Link
            href="/"
            locale={otherLocale as "en" | "ar"}
            className="mt-1 inline-block text-2xl font-bold text-blue-600 underline underline-offset-2 hover:text-blue-800 transition-colors"
          >
            {otherLocale}
          </Link>
        </div>
      </div>

      {/* Nav keys demo */}
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 w-full max-w-lg">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Translated nav keys
        </p>
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          {(["dashboard", "login", "logout", "settings"] as const).map((key) => (
            <li key={key} className="flex items-center gap-2">
              <span className="text-gray-400">•</span>
              <span className="font-mono text-xs text-gray-400">{key}:</span>
              <span>{tNav(key)}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-gray-400">
        Edit{" "}
        <code className="rounded bg-gray-100 px-1 py-0.5 font-mono">
          src/i18n/request.ts
        </code>{" "}
        to add more locales and messages.
      </p>
    </main>
  );
}
