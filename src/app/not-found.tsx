import Link from "next/link";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

// Root 404 for URLs that do not match a route segment at all.
export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-4">
            <div className="max-w-md text-center">
                <div className="mb-6">
                    <AlertCircle className="mx-auto h-24 w-24 text-muted-foreground" />
                </div>
                <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">
                    Page Not Found
                </h2>
                <p className="mb-8 text-muted-foreground">
                    The page you requested does not exist.
                </p>
                <Button asChild size="lg">
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Go Home
                    </Link>
                </Button>
            </div>
        </main>
    );
}
