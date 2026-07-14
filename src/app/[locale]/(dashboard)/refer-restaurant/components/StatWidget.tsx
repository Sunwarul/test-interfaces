"use client";

import { Square, Users } from "lucide-react";

interface StatWidgetProps {
    type: "commission" | "referrals";
    value: string | number;
    label?: string;
}

export function StatWidget({ type, value, label }: StatWidgetProps) {
    const isCommission = type === "commission";

    return (
        <div className="bg-black/5 flex flex-col justify-between min-h-[100px] p-4 rounded-3xl flex-1 min-w-px">
            {/* Header with icon */}
            <div className="flex items-center gap-1">
                {isCommission ? (
                    <Square className="size-5 text-black/40" />
                ) : (
                    <Users className="size-5 text-black/40" />
                )}
                <span className="text-[13px] font-bold leading-4 text-black/40">
                    {isCommission ? "Commission Earned" : "Referrals"}
                </span>
            </div>

            {/* Value */}
            <div className="pl-0">
                <p className="text-[20px] font-bold leading-6 text-black tracking-[-0.2px] flex-1 min-w-px">
                    {isCommission ? (
                        <>
                            {typeof value === "number" ? (
                                <>₹{value.toFixed(2)}</>
                            ) : (
                                value
                            )}
                        </>
                    ) : (
                        <>
                            {typeof value === "number" ? (
                                <>{value} Restaurant{value !== 1 ? "s" : ""}</>
                            ) : (
                                value
                            )}
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}