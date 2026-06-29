import { apiClient } from "@/lib/apiClient";
import { API_IDS } from "../config";
import type { DriverMenuApiResponse } from "../types";

export const driverMenuService = {
  async getProfile(id: string): Promise<DriverMenuApiResponse> {
    const response = await apiClient.get<DriverMenuApiResponse>(
      `/entities/read/${id}`,
      {
        params: {
          component_id: API_IDS.componentId,
          module_id: API_IDS.moduleId,
          section_id: API_IDS.sectionId,
          interface_id: API_IDS.interfaceId,
          brand_service_id: API_IDS.brandServiceId,
          project_id: API_IDS.projectId,
        },
      }
    );
    return response.data;
  },
};