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
    data: {
        items: LanguageItem[];
        enum: Record<string, unknown>;
        datasets: Record<string, unknown>;
    };
    current_page: number;
    items_per_page: number;
    total: number;
    page_items: number;
    last_page: number;
}