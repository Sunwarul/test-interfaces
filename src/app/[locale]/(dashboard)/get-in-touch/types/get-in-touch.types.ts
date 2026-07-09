import { z } from "zod";

// Field schema from API Guide
// questions: varchar(255) | optional | max:255 - Defines the category of feedback
// details: varchar(255) | optional - Detailed message submitted by the user
// entity_1_type: varchar(255) | required - Primary entity type linked to the feedback
// entity_1_id: varchar(255) | required - ID of the linked primary entity
// code: varchar(255) | required | max:191 - System-generated unique feedback code

export const GetInTouchSchema = z.object({
    questions: z.string().max(255).optional().nullable(),
    details: z.string().max(255).optional().nullable(),
    entity_1_type: z.string().max(255).optional().nullable(),
    entity_1_id: z.string().max(255).optional().nullable(),
    code: z.string().max(191).optional().nullable(),
});

export type GetInTouchFormData = z.infer<typeof GetInTouchSchema>;

// API response types
export interface GetInTouchRequestBodyResponse {
    success: boolean;
    message: string;
    data: {
        fields: Record<string, string>;
        enum: Record<string, unknown>;
        datasets: Record<string, unknown>;
    };
    meta: {
        default_values: Record<string, unknown>;
        session_values: Record<string, unknown>;
    };
    execution_time: number;
    timestamp: string;
}

export interface CreateFeedbackResponse {
    success: boolean;
    message: string;
    data: {
        main: {
            id: string;
            endpoint_id: string;
            table_name: string;
        };
        related: Record<string, unknown>;
    };
}

// Validation error response
export interface ValidationErrorResponse {
    success: false;
    message: string;
    error: string;
    details: Record<string, string>;
    meta: {
        default_values: Record<string, unknown>;
        session_values: Record<string, unknown>;
    };
}

// Contact details type
export interface ContactRow {
    id: string;
    icon: "phone-uae" | "phone-intl" | "email";
    value: string;
    label: string;
    href?: string;
}

export const CONTACT_DETAILS: ContactRow[] = [
    {
        id: "uae-phone",
        icon: "phone-uae",
        value: "600 575 556",
        label: "Within UAE",
        href: "tel:600575556",
    },
    {
        id: "intl-phone",
        icon: "phone-intl",
        value: "+971 600 575 556",
        label: "Outside UAE",
        href: "tel:+971600575556",
    },
    {
        id: "email",
        icon: "email",
        value: "customercare@cbd.ae",
        label: "For feedback or complaints",
        href: "mailto:customercare@cbd.ae",
    },
];