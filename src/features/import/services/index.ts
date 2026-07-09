// @ts-nocheck
/**
 * Import Feature Services
 * API calls for file import using FormData upload
 */

import { env } from "@/config/env";
import { IMPORT_CONFIG } from "../config";
import type { ImportParams, ImportResponse, SelectedFile } from "../types";

/**
 * Build URL with query parameters
 */
function buildImportUrl(params: ImportParams): string {
  const url = new URL(`${env.apiBaseUrl}/entities/import`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
}

/**
 * Import entity data from file
 * POST /entities/import
 *
 * Uploads file using FormData with 'file' key
 */
export async function importEntity(
  file: SelectedFile,
  overrides?: Partial<ImportParams>
): Promise<ImportResponse> {
  const params: ImportParams = {
    component_id: overrides?.component_id ?? IMPORT_CONFIG.componentId,
    module_id: overrides?.module_id ?? IMPORT_CONFIG.moduleId,
    section_id: overrides?.section_id ?? IMPORT_CONFIG.sectionId,
    brand_service_id: overrides?.brand_service_id ?? IMPORT_CONFIG.brandServiceId,
    interface_id: overrides?.interface_id ?? IMPORT_CONFIG.interfaceId,
    project_id: overrides?.project_id ?? IMPORT_CONFIG.projectId,
  };

  const url = buildImportUrl(params);

  // Build FormData with file
  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    name: file.name ?? "upload",
    type: file.mimeType ?? "application/octet-stream",
  } as unknown as Blob);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw {
      message: errorData.message ?? `Import failed: ${response.status}`,
      code: errorData.code,
      status: response.status,
    };
  }

  const data = await response.json();

  return {
    success: true,
    message: data.message ?? "Import completed successfully",
    recordsImported: data.recordsImported ?? 0,
    errors: data.errors,
  };
}
