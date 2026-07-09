"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { ArrowLeft, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetInTouchForm } from "./GetInTouchForm";
import { ContactDetails } from "./ContactDetails";
import { FaqLink } from "./FaqLink";
import { useGetInTouchRequestBody } from "../hooks/useGetInTouchRequestBody";

export function GetInTouchPage() {
    const router = useRouter();
    const { isLoading, isError, refetch } = useGetInTouchRequestBody();

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white flex gap-6 items-start pb-4 pl-2 pr-6 pt-[59px] relative w-full">
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-14 rounded-full shrink-0"
                    onClick={handleBack}
                    aria-label="Go back"
                >
                    <ArrowLeft className="size-6" />
                </Button>
                <h1 className="flex-1 font-bold leading-8 text-[24px] text-black tracking-[-0.48px] min-w-px">
                    Get in Touch
                </h1>
                <Button
                    variant="ghost"
                    size="icon"
                    className="size-14 rounded-full shrink-0 shadow-[0px_0px_24px_rgba(0,0,0,0.2)]"
                    aria-label="Notifications"
                >
                    <Bell className="size-6" />
                </Button>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6 px-6">
                {/* FAQ Link */}
                <FaqLink />

                {/* Form Section */}
                <div className="flex flex-col gap-4">
                    <GetInTouchForm
                        isLoading={isLoading}
                        isError={isError}
                        onRetry={refetch}
                    />
                </div>
            </div>

            {/* Contact Details Section */}
            <div className="flex flex-col items-start pt-10">
                <h2 className="font-bold leading-6 pb-4 px-6 text-[20px] text-black tracking-[-0.2px] w-full">
                    Contact Details
                </h2>
                <ContactDetails />
            </div>
        </div>
    );
}