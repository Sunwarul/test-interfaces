"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FEEDBACK_TABS, type FeedbackTabId } from "../config/get-in-touch.config";
import { useSubmitFeedback } from "../hooks/useSubmitFeedback";
import { ErrorState } from "@/components/shared/ErrorState";

interface GetInTouchFormProps {
    isLoading: boolean;
    isError: boolean;
    onRetry: () => void;
}

export function GetInTouchForm({
    isLoading,
    isError,
    onRetry,
}: GetInTouchFormProps) {
    const [activeTab, setActiveTab] = useState<FeedbackTabId>("questions");
    const [message, setMessage] = useState("");
    const { mutate: submitFeedback, isPending } = useSubmitFeedback();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim()) return;

        submitFeedback({
            questions: activeTab,
            details: message,
            entity_1_type: null,
            entity_1_id: null,
            code: null,
        });

        // Reset form on success (handled by toast + query invalidation)
        setMessage("");
    };

    const isDisabled = isPending || !message.trim();

    if (isError) {
        return <ErrorState onRetry={onRetry} />;
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                {/* Tabs skeleton */}
                <div className="flex gap-1">
                    {FEEDBACK_TABS.map((tab) => (
                        <div
                            key={tab.id}
                            className="flex-1 h-8 bg-black/5 rounded-full animate-pulse"
                        />
                    ))}
                </div>
                {/* Textarea skeleton */}
                <div className="min-h-[48px] bg-black/5 rounded-3xl animate-pulse" />
                {/* Button skeleton */}
                <div className="h-14 bg-black/5 rounded-full animate-pulse" />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Tab Selector */}
            <div className="flex gap-1">
                {FEEDBACK_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 px-4 py-2 rounded-full text-[13px] font-bold leading-4 text-center whitespace-nowrap transition-colors ${
                            activeTab === tab.id
                                ? "bg-black text-white"
                                : "bg-black/5 text-black"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Message Textarea */}
            <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                className="min-h-[120px] rounded-3xl border-black/10 px-4 py-3 text-base resize-none"
                disabled={isPending}
            />

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isDisabled}
                className={`h-14 rounded-full w-full font-bold text-[20px] leading-6 tracking-[-0.2px] transition-colors ${
                    isDisabled
                        ? "bg-black/10 text-black/20"
                        : "bg-[var(--color-brand-purple)] text-white hover:bg-[var(--color-brand-purple)]/90"
                }`}
            >
                {isPending ? (
                    <span className="flex items-center gap-2">
                        <Loader2 className="size-5 animate-spin" />
                        Sending...
                    </span>
                ) : (
                    "Send Message"
                )}
            </Button>
        </form>
    );
}