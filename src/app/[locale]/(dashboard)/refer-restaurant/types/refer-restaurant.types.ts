// Types for Refer Restaurant screen
// From API Guide Step 2 (Item response schema)

export interface Currency {
    id: string;
    value: string | null;
}

export interface ReferRestaurantItem {
    id: string;
    commissionEarned: number;
    referrals: number;
    currency: Currency;
    commissionValue: number;
}

export interface ReferRestaurantResponse {
    success: boolean;
    message: string;
    data: {
        item: ReferRestaurantItem;
        datasets?: Record<string, unknown>;
        enum?: Record<string, unknown>;
    };
    meta?: {
        default_values: Record<string, unknown>;
        session_values: Record<string, unknown>;
    };
    execution_time: number;
    timestamp: string;
}