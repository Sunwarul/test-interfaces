/**
 * Language Service
 * API calls for language selection feature
 */

import { apiClient } from "@/lib/apiClient";
import type { LanguagesListResponse } from "../types/language.types";
import { LIST_LANGUAGES_CONFIG } from "../config/language.config";

export interface GetLanguagesParams {
    search?: string;
    page?: number;
    page_limit?: number;
}

export async function getLanguages(params: GetLanguagesParams = {}): Promise<LanguagesListResponse> {
    const { data } = await apiClient.get<LanguagesListResponse>("/entities/list", {
        params: {
            ...LIST_LANGUAGES_CONFIG,
            page: params.page ?? 1,
            page_limit: params.page_limit ?? 50,
            ...(params.search ? { search: params.search } : {}),
        },
    });

    return data;
}