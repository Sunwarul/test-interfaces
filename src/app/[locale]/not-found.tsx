"use client";

import { AlertCircle, Home } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center max-w-md">
                <div className="mb-6">
                    <AlertCircle className="w-24 h-24 text-muted-foreground mx-auto" />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Page Not Found
                </h2>
                <p className="text-muted-foreground mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved.
                </p>
                <Button asChild size="lg">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Go Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
