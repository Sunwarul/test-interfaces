import { apiClient } from "@/lib/apiClient";
import { READ_RESERVATION_CONFIG } from "../config/reservations.config";
import type { ReservationApiResponse } from "../types/reservations.types";

export async function getReservation(
    id: string,
    config = READ_RESERVATION_CONFIG
): Promise<ReservationApiResponse> {
    const { data } = await apiClient.get<ReservationApiResponse>(
        `/entities/read/${id}`,
        {
            params: {
                component_id: config.component_id,
                module_id: config.module_id,
                section_id: config.section_id,
                interface_id: config.interface_id,
                brand_service_id: config.brand_service_id,
                project_id: config.project_id,
            },
        }
    );
    return data;
}