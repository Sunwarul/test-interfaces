export interface EarningsRecord {
    id: string;
    currencyCode: string;
    currencySymbol: string;
    grantTotal: number;
}

export interface ReadEarningsResponse {
    success: boolean;
    message: string;
    data?: {
        item: EarningsRecord;
    };
}