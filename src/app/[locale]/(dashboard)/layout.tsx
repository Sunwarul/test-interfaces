"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardHeader } from "@/components/layout/DashboardHeader";

export default function DashboardLayout({
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
        if (!isLoading && !isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || !isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="size-8 rounded-full border-4 border-black/10 border-t-[#ff5634] animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0">
                <DashboardHeader />
                <div className="flex-1 p-6">{children}</div>
            </main>
        </div>
    );
}