import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

// ---------------------------------------------------------------------------
// Public paths — accessible without an auth token.
// Add any (auth) route paths here.
// ---------------------------------------------------------------------------
const PUBLIC_PATHS = [
    "/login",
    "/signup",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/verify-phone",
];

function matchesPublicPath(pathname: string): boolean {
    return routing.locales.some((locale) =>
        PUBLIC_PATHS.some(
            (path) =>
                pathname === `/${locale}${path}` ||
                pathname === path ||
                pathname.startsWith(`/${locale}${path}/`) ||
                pathname.startsWith(`${path}/`),
        ),
    );
}

// Inline JWT expiry check — no external imports needed in middleware
function isTokenExpired(token: string): boolean {
    try {
        const parts = token.split(".");
        if (parts.length < 2) return true;
        const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64.padEnd(
            base64.length + ((4 - (base64.length % 4)) % 4),
            "=",
        );
        const payload = JSON.parse(atob(padded));
        if (typeof payload.exp !== "number") return false;
        return payload.exp < Date.now() / 1000;
    } catch {
        return false;
    }
}

export function proxy(request: NextRequest) {
    const rawToken = request.cookies.get("authToken")?.value;
    const userId = request.cookies.get("authUserId")?.value;
    const pathname = request.nextUrl.pathname;

    const locale =
        routing.locales.find(
            (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`,
        ) || routing.defaultLocale;

    const isPublicPath = matchesPublicPath(pathname);

    // Expired token — clear cookies and force re-login
    if (rawToken && isTokenExpired(rawToken)) {
        const loginUrl = new URL(`/${locale}/login`, request.url);
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete("authToken");
        response.cookies.delete("authUserId");
        return response;
    }

    const isAuthenticated = !!rawToken;

    // Unauthenticated on a protected path → redirect to login
    if (!isAuthenticated && !isPublicPath) {
        const loginUrl = new URL(`/${locale}/login`, request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Authenticated on any (auth) page → redirect to home/dashboard
    if (isAuthenticated && isPublicPath) {
        const dashboardUrl = new URL(`/${locale}`, request.url);
        return NextResponse.redirect(dashboardUrl);
    }

    // Forward auth headers for downstream SSR / API route use
    if (rawToken) {
        request.headers.set("Authorization", `Bearer ${rawToken}`);
    }
    if (userId) {
        request.headers.set("x-user-id", userId);
    }

    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except Next.js internals and static files
    matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
