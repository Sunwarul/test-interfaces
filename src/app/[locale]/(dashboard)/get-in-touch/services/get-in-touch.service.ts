import { apiClient } from "@/lib/apiClient";
import { GET_IN_TOUCH_CONFIG } from "../config/get-in-touch.config";
import type {
    GetInTouchRequestBodyResponse,
    CreateFeedbackResponse,
} from "../types/get-in-touch.types";

/**
 * Fetch form schema for Get in Touch screen.
 * Returns fields, enum, and datasets for rendering the form.
 */
export async function getRequestBody() {
    const response = await apiClient.get<GetInTouchRequestBodyResponse>(
        "/entities/get-request-body",
        {
            params: {
                ...GET_IN_TOUCH_CONFIG,
            },
        }
    );
    return response.data;
}

/**
 * Submit feedback form.
 * Creates a new feedback record.
 */
export async function submitFeedback(data: {
    questions: string | null;
    details: string | null;
    entity_1_type: string | null;
    entity_1_id: string | null;
    code: string | null;
}) {
    const response = await apiClient.post<CreateFeedbackResponse>(
        "/entities/create",
        { data },
        {
            params: {
                ...GET_IN_TOUCH_CONFIG,
            },
        }
    );
    return response.data;
}