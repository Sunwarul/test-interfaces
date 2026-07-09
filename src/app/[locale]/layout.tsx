import { NuqsAdapter } from "nuqs/adapters/next/app";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import { LocaleHtmlAttributes } from "@/components/LocaleHtmlAttributes";
import { routing } from "@/i18n/routing";
import { locales } from "@/i18n.config";
import { TanstackQueryProvider } from "@/providers/TanstackQueryProvider";

// Locale layout — providers + locale resolution only.
// <html> and <body> live in src/app/layout.tsx (root) to satisfy Next.js 16
// strict mode. We DO NOT render <html>/<body> here to avoid nesting them.

export const generateStaticParams = () =>
    locales.map((locale) => ({ locale }));

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <LocaleHtmlAttributes />
            <NuqsAdapter>
                <TanstackQueryProvider>
                    {children}
                    <Toaster />
                </TanstackQueryProvider>
            </NuqsAdapter>
        </NextIntlClientProvider>
    );
}
