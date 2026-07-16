/**
 * Language Selection Screen Types
 */

export interface LanguageItem {
    index: number;
    id: string;
    code: string;
    languageName: string;
}

export interface LanguagesListResponse {
    success: boolean;
    message: string;
    meta: Record<string, unknown>;
    data: {
        items: LanguageItem[];
        enum: Record<string, unknown>;
        datasets: Record<string, unknown>;
    };
    execution_time: number;
    cached: boolean;
    current_page: number;
    items_per_page: number;
    total: number;
    page_items: number;
    last_page: number;
}