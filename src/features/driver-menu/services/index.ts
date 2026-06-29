import { apiClient } from "@/lib/apiClient";
import { API_IDS, CLONE_API_IDS, DELETE_API_IDS } from "../config";
import type { DriverMenuApiResponse, CloneResponse, DeleteResponse } from "../types";

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

  async cloneRecord(id: string): Promise<CloneResponse> {
    const response = await apiClient.post<CloneResponse>(
      `/entities/clone/${id}`,
      {},
      {
        params: {
          component_id: CLONE_API_IDS.componentId,
          module_id: CLONE_API_IDS.moduleId,
          section_id: CLONE_API_IDS.sectionId,
          interface_id: CLONE_API_IDS.interfaceId,
          brand_service_id: CLONE_API_IDS.brandServiceId,
          project_id: CLONE_API_IDS.projectId,
        },
      }
    );
    return response.data;
  },

  async deleteRecord(id: string): Promise<DeleteResponse> {
    const response = await apiClient.delete<DeleteResponse>(
      `/entities/delete/${id}`,
      {
        params: {
          component_id: DELETE_API_IDS.componentId,
          module_id: DELETE_API_IDS.moduleId,
          section_id: DELETE_API_IDS.sectionId,
          interface_id: DELETE_API_IDS.interfaceId,
          brand_service_id: DELETE_API_IDS.brandServiceId,
          project_id: DELETE_API_IDS.projectId,
        },
      }
    );
    return response.data;
  },
};