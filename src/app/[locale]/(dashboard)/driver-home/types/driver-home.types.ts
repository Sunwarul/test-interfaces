/**
 * Driver Home Screen Types
 */

export interface DriverItem {
    index: number;
    id: string;
    firstName: string | null;
    lastName: string;
    availabilityStatus: number | null;
}

export interface DriversListResponse {
    success: boolean;
    message: string;
    data: {
        items: DriverItem[];
        enum: Record<string, unknown>;
        datasets: Record<string, unknown>;
    };
    current_page: number;
    items_per_page: number;
    total: number;
    page_items: number;
    last_page: number;
}

export interface MenuItem {
    label: string;
    href: string;
    icon?: React.ReactNode;
}

export interface BottomMenuItem {
    label: string;
    href: string;
    icon: React.ReactNode;
}