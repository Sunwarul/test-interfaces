"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const accessToken = useAuthStore((state) => state.accessToken);
    const user = useAuthStore((state) => state.user);
    const hasHydrated = useAuthStore((state) => state._hasHydrated);

    const isAuthenticated = Boolean(accessToken && user);
    const isLoading = !hasHydrated;

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace("/");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
