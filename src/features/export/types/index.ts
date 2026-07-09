// @ts-nocheck
/**
 * Export Feature Types
 * File export API integration
 */

import { z } from "zod";
import type { ExportType } from "../config";

/**
 * Query parameters for /entities/export endpoint
 */
export interface ExportParams {
  export_type: ExportType;
  component_id: string;
  module_id: string;
  section_id: string;
  brand_service_id: string;
  interface_id: string;
  project_id: string;
  page: number;
  page_limit: number;
}

/**
 * Zod schema for Export params validation
 */
export const exportParamsSchema = z.object({
  export_type: z.enum(["csv", "excel", "pdf", "json", "toon"]),
  component_id: z.string().min(1),
  module_id: z.string().min(1),
  section_id: z.string().min(1),
  brand_service_id: z.string().min(1),
  interface_id: z.string().min(1),
  project_id: z.string().min(1),
  page: z.number().int().positive().default(1),
  page_limit: z.number().int().positive().max(1000).default(100),
});

/**
 * Export response with file metadata
 */
export interface ExportResponse {
  success: boolean;
  filename: string;
  contentType: string;
  contentLength: number;
  fileUri?: string;
}

/**
 * Export error response
 */
export interface ExportError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * Form values for export options selection
 */
export interface ExportFormValues {
  exportType: ExportType;
}
