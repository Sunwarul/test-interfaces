import { Suspense } from "react";
import { ReferRestaurantPage } from "./components/ReferRestaurantPage";

export default function ReferRestaurantListPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-screen">
                    <div className="size-8 rounded-full border-4 border-black/10 border-t-[#6054ba] animate-spin" />
                </div>
            }
        >
            <ReferRestaurantPage />
        </Suspense>
    );
}