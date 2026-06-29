/**
 * Export Feature Services
 * API calls for file export using shared apiClient pattern
 */

import { File, Paths } from "expo-file-system";
import { env } from "@/config/env";
import { EXPORT_CONFIG, EXPORT_DEFAULT_PARAMS, type ExportType } from "../config";
import type { ExportParams, ExportResponse } from "../types";

/**
 * Build URL with query parameters
 */
function buildExportUrl(params: ExportParams): string {
  const url = new URL(`${env.apiBaseUrl}/entities/export`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, String(value));
    }
  });

  return url.toString();
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
 * Export entity data as file
 * GET /entities/export
 *
 * Fetches the file and saves it to the device's document directory
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

  const url = buildExportUrl(params);

  // Get filename from export type
  const extension = getExtension(exportType);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const filename = `data_export_${timestamp}${extension}`;

  // Create destination file in document directory
  const destinationFile = new File(Paths.document, filename);

  try {
    // Download the file to the document directory
    const downloadedFile = await File.downloadFileAsync(url, destinationFile);

    return {
      success: true,
      filename: downloadedFile.name,
      contentType: getContentType(exportType),
      contentLength: 0, // File class doesn't expose size directly
      fileUri: downloadedFile.uri,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Export failed: ${error.message}`);
    }
    throw new Error("Export failed: Unknown error");
  }
}