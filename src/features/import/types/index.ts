/**
 * Import Feature Types
 * File import API integration
 */

import { z } from "zod";

/**
 * Import parameters for /entities/import endpoint
 */
export interface ImportParams {
  component_id: string;
  module_id: string;
  section_id: string;
  brand_service_id: string;
  interface_id: string;
  project_id: string;
}

/**
 * Zod schema for Import params validation
 */
export const importParamsSchema = z.object({
  component_id: z.string().min(1),
  module_id: z.string().min(1),
  section_id: z.string().min(1),
  brand_service_id: z.string().min(1),
  interface_id: z.string().min(1),
  project_id: z.string().min(1),
});

/**
 * File info from document picker
 */
export interface SelectedFile {
  uri: string;
  name: string;
  mimeType: string;
  size?: number;
}

/**
 * Import response
 */
export interface ImportResponse {
  success: boolean;
  message?: string;
  recordsImported?: number;
  errors?: string[];
}

/**
 * Import error response
 */
export interface ImportError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * Form values for import form
 */
export interface ImportFormValues {
  file: SelectedFile | null;
}