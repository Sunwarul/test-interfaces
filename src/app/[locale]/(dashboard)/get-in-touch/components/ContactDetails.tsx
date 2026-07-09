"use client";

import { Phone, Mail, ChevronRight } from "lucide-react";
import { CONTACT_DETAILS } from "../types/get-in-touch.types";

export function ContactDetails() {
    return (
        <div className="w-full">
            {CONTACT_DETAILS.map((contact) => (
                <a
                    key={contact.id}
                    href={contact.href}
                    className="flex gap-2 items-center p-6 border-b border-black/10 hover:bg-black/5 transition-colors"
                >
                    {/* Icon */}
                    <div className="relative shrink-0 size-8">
                        {contact.icon === "phone-uae" && (
                            <div className="flex items-center justify-center size-6 -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2">
                                <span className="text-2xl">🇦🇪</span>
                            </div>
                        )}
                        {contact.icon === "phone-intl" && (
                            <Phone className="size-6 text-black" />
                        )}
                        {contact.icon === "email" && (
                            <Mail className="size-6 text-black" />
                        )}
                    </div>

                    {/* Text */}
                    <div className="flex-1 flex flex-col gap-0 min-w-px">
                        <p className="font-medium leading-6 text-[16px] text-black tracking-[-0.16px]">
                            {contact.value}
                        </p>
                        <p className="font-normal leading-4 text-[13px] text-black/60">
                            {contact.label}
                        </p>
                    </div>

                    {/* Chevron */}
                    <ChevronRight className="size-6 text-black/40 shrink-0" />
                </a>
            ))}
        </div>
    );
}