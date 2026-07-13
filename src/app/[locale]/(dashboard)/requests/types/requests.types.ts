// Request item from API
export interface RequestItem {
    id: string;
    paymentMethod: {
        id: string;
        value: string | null;
    };
    deliveryDistance: number | null;
    paymentStatus: number;
    currencyOfTotalAmount: {
        id: string;
        value: string | null;
    };
    totalPrice: number;
    deliveryAddress: {
        id: string;
        value: string | null;
    };
}

// API response type
export interface RequestDetailResponse {
    success: boolean;
    message: string;
    data: {
        item: RequestItem;
        enum: Record<string, unknown>;
        datasets: Record<string, unknown>;
    };
    meta: Record<string, unknown>;
    execution_time: number;
    timestamp: string;
}

// Location data for display
export interface LocationData {
    type: "pickup" | "delivery" | "current";
    address: string;
    distance?: string;
    eta?: string;
    tripDistance?: string;
}