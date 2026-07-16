"use client";

import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="relative w-[414px] h-[896px] bg-white overflow-hidden rounded-[40px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 animate-spin text-brand-purple" />
                <p className="text-body-normal text-black-60">Loading...</p>
            </div>
        </div>
    );
}