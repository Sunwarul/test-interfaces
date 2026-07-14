import { apiClient } from "@/lib/apiClient";
import { READ_EARNINGS_CONFIG } from "../config/earnings.config";
import type { ReadEarningsResponse } from "../types/earnings.types";

export async function fetchLastEarned(recordId: string): Promise<ReadEarningsResponse> {
    const { data } = await apiClient.get<ReadEarningsResponse>(
        `/entities/read/${recordId}`,
        {
            params: {
                component_id: READ_EARNINGS_CONFIG.component_id,
                module_id: READ_EARNINGS_CONFIG.module_id,
                section_id: READ_EARNINGS_CONFIG.section_id,
                interface_id: READ_EARNINGS_CONFIG.interface_id,
                brand_service_id: READ_EARNINGS_CONFIG.brand_service_id,
                project_id: READ_EARNINGS_CONFIG.project_id,
            },
        }
    );
    return data;
}