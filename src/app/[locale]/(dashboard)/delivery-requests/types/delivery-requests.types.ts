// Delivery Request item from API
export interface DeliveryRequestItem {
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

// API response types
export interface DeliveryRequestResponse {
    success: boolean;
    message: string;
    data: {
        item: DeliveryRequestItem;
        enum: Record<string, unknown>;
        datasets: Record<string, unknown>;
    };
    meta: Record<string, unknown>;
    execution_time: number;
    timestamp: string;
}

// Payment status mapping
export type PaymentStatus = "cash" | "paid" | "pending" | number;

export interface PaymentStatusOption {
    value: number;
    label: string;
}