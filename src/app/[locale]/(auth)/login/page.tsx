"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useLogin, getErrorMessage } from "@/hooks/requests/useAuth";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
    const t = useTranslations("auth");
    const tCommon = useTranslations("common");
    const router = useRouter();
    const login = useLogin();

    const [identityKey, setIdentityKey] = useState("");
    const [authSecret, setAuthSecret] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        login.mutate(
            { identity_key: identityKey, auth_secret: authSecret },
            { onSuccess: () => router.replace("/") },
        );
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-muted/60 to-background p-4">
            <Card className="w-full max-w-sm shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">
                        {tCommon("appName")}
                    </CardTitle>
                    <CardDescription>{t("subtitle")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="identity_key">{t("email")}</Label>
                            <Input
                                id="identity_key"
                                type="email"
                                autoComplete="email"
                                placeholder={t("emailPlaceholder")}
                                value={identityKey}
                                onChange={(e) => setIdentityKey(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="auth_secret">{t("password")}</Label>
                            <Input
                                id="auth_secret"
                                type="password"
                                autoComplete="current-password"
                                value={authSecret}
                                onChange={(e) => setAuthSecret(e.target.value)}
                                required
                            />
                        </div>

                        {login.isError && (
                            <p
                                role="alert"
                                className="text-sm text-destructive"
                            >
                                {getErrorMessage(login.error)}
                            </p>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={login.isPending}
                        >
                            {login.isPending && <Spinner />}
                            {t("submit")}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
