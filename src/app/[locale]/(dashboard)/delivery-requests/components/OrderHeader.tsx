"use client";

import type { DeliveryRequestItem } from "../types/delivery-requests.types";

interface OrderHeaderProps {
    item: DeliveryRequestItem;
    className?: string;
}

export function OrderHeader({ item, className }: OrderHeaderProps) {
    const currencySymbol = item.currencyOfTotalAmount?.value ?? "₹";
    const price = item.totalPrice?.toFixed(2) ?? "0.00";
    const paymentMethod = item.paymentMethod?.value ?? "Cash";
    const distance = item.deliveryDistance ?? 0;
    const distanceText = distance > 0 ? `${distance.toFixed(1)} km in total` : "";

    // Payment status - 0 = pending/cash, 1 = paid
    const isPaid = item.paymentStatus === 1;
    const statusLabel = isPaid ? "Paid" : paymentMethod;
    const statusBgClass = isPaid
        ? "bg-[rgba(76,175,80,0.2)]"
        : "bg-black";
    const statusTextClass = isPaid
        ? "text-[#4caf50]"
        : "text-white";

    return (
        <div className={`flex flex-col gap-1 ${className ?? ""}`}>
            <div className="flex items-center gap-2">
                <span className="text-[32px] font-bold tracking-[-0.96px] text-black">
                    {currencySymbol}{price}
                </span>
                <span
                    className={`inline-flex items-center h-5 px-2 rounded-full text-[13px] font-bold ${statusBgClass} ${statusTextClass}`}
                >
                    {statusLabel}
                </span>
            </div>
            {distanceText && (
                <span className="text-[13px] text-black/60">
                    {distanceText}
                </span>
            )}
        </div>
    );
}