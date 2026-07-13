"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AcceptButtonProps {
    onClick: () => void;
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
}

export function AcceptButton({
    onClick,
    isLoading = false,
    disabled = false,
    className,
}: AcceptButtonProps) {
    return (
        <div className={`w-full ${className ?? ""}`}>
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                className="w-full h-14 rounded-[32px] bg-[#6054ba] hover:bg-[#4a3f9e] text-white text-[20px] font-bold tracking-[-0.2px] shadow-[0_0_48px_rgba(0,0,0,0.2)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Accepting...
                    </>
                ) : (
                    "Accept Order"
                )}
            </Button>
        </div>
    );
}