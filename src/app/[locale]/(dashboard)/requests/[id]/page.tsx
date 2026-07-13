import { Suspense } from "react";
import { RequestDetailPage } from "../components/RequestDetailPage";

export default function RequestDetailRoute() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen bg-white">
                    <div className="size-8 rounded-full border-4 border-black/10 border-t-[#6054ba] animate-spin" />
                </div>
            }
        >
            <RequestDetailPage />
        </Suspense>
    );
}