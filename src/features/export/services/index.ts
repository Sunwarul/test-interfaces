/**
 * Export Feature Services
 * API calls for file export using shared apiClient pattern
 */

import { File, Paths } from "expo-file-system";
import { apiClient } from "@/lib/apiClient";
import { EXPORT_CONFIG, EXPORT_DEFAULT_PARAMS, type ExportType } from "../config";
import type { ExportParams, ExportResponse } from "../types";

/**
 * Extract filename from content-disposition header
 */
function extractFilename(contentDisposition: string | null): string | null {
  if (!contentDisposition) return null;

  const match = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
  if (match && match[1]) {
    return match[1].replace(/['"]/g, "");
  }
  return null;
}

/**
 * Get content type from export type
 */
function getContentType(exportType: ExportType): string {
  const contentTypes: Record<ExportType, string> = {
    csv: "text/csv; charset=utf-8",
    excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    pdf: "application/pdf",
    json: "application/json",
    toon: "application/octet-stream",
  };
  return contentTypes[exportType];
}

/**
 * Get file extension from export type
 */
function getExtension(exportType: ExportType): string {
  const extensions: Record<ExportType, string> = {
    csv: ".csv",
    excel: ".xlsx",
    pdf: ".pdf",
    json: ".json",
    toon: ".toon",
  };
  return extensions[exportType];
}

/**
 * Convert ArrayBuffer to base64 string (React Native compatible)
 */
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Export entity data as file
 * GET /entities/export
 *
 * Uses apiClient for automatic Bearer token injection
 * Downloads the file and saves it to the cache directory
 */
export async function exportEntity(
  exportType: ExportType,
  overrides?: Partial<ExportParams>
): Promise<ExportResponse> {
  const params: ExportParams = {
    export_type: exportType,
    component_id: overrides?.component_id ?? EXPORT_CONFIG.componentId,
    module_id: overrides?.module_id ?? EXPORT_CONFIG.moduleId,
    section_id: overrides?.section_id ?? EXPORT_CONFIG.sectionId,
    brand_service_id: overrides?.brand_service_id ?? EXPORT_CONFIG.brandServiceId,
    interface_id: overrides?.interface_id ?? EXPORT_CONFIG.interfaceId,
    project_id: overrides?.project_id ?? EXPORT_CONFIG.projectId,
    page: overrides?.page ?? EXPORT_DEFAULT_PARAMS.page,
    page_limit: overrides?.page_limit ?? EXPORT_DEFAULT_PARAMS.pageLimit,
  };

  // Build URL with query parameters
  const url = `${process.env.EXPO_PUBLIC_API_BASE_URL ?? ""}/entities/export`;
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  });

  const fullUrl = `${url}?${queryParams.toString()}`;

  // Get extension and generate filename
  const extension = getExtension(exportType);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const filename = `data_export_${timestamp}${extension}`;

  // Create destination file in cache directory using new expo-file-system API
  const destinationFile = new File(Paths.cache, filename);

  try {
    // Use apiClient to get the response with headers
    const response = await apiClient.get(fullUrl, {
      responseType: "arraybuffer",
    });

    // Extract headers
    const contentDisposition = response.headers["content-disposition"] as string | null;
    const contentType = response.headers["content-type"] as string | null;
    const contentLength = response.headers["content-length"] as string | null;

    // Extract filename from header or use generated one
    const extractedFilename = extractFilename(contentDisposition) ?? filename;

    // Convert ArrayBuffer to base64 and write to file
    const base64Data = arrayBufferToBase64(response.data);
    await destinationFile.write(base64Data);

    return {
      success: true,
      filename: extractedFilename,
      contentType: contentType ?? getContentType(exportType),
      contentLength: contentLength ? parseInt(contentLength, 10) : 0,
      fileUri: destinationFile.uri,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Export failed: ${error.message}`);
    }
    throw new Error("Export failed: Unknown error");
  }
}