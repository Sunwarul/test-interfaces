import { Suspense } from "react";
import { GetInTouchPage } from "./components/GetInTouchPage";

export default function GetInTouchListPage() {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="size-8 rounded-full border-4 border-black/10 border-t-[#ff5634] animate-spin" />
                </div>
            }
        >
            <GetInTouchPage />
        </Suspense>
    );
}