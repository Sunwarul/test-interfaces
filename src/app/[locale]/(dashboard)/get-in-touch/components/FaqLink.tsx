"use client";

import { Link } from "@/i18n/navigation";

export function FaqLink() {
    return (
        <p className="font-normal leading-6 text-[16px] text-black/60 tracking-[-0.16px]">
            Have a question?{" "}
            <Link
                href="/faq"
                className="font-medium text-[#3686f7] underline underline-offset-4 decoration-solid"
            >
                Browse our FAQs
            </Link>{" "}
            or get in touch with our fantastic team.
        </p>
    );
}