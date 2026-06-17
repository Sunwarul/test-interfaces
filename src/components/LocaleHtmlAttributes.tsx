"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/**
 * Keeps <html> lang/dir in sync with the active locale. Root layout must own
 * <html>/<body>; those attributes are updated here after hydration.
 */
export function LocaleHtmlAttributes() {
    const locale = useLocale();

    useEffect(() => {
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    }, [locale]);

    return null;
}
