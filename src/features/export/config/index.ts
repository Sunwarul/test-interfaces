/**
 * Export Feature Configuration
 * API mapping IDs from Interface API Guide
 */

/**
 * Export format types
 */
export const EXPORT_TYPES = {
  CSV: "csv",
  EXCEL: "excel",
  PDF: "pdf",
  JSON: "json",
  TOON: "toon",
} as const;

export type ExportType = (typeof EXPORT_TYPES)[keyof typeof EXPORT_TYPES];

/**
 * Export format options for UI
 */
export interface ExportFormatOption {
  type: ExportType;
  label: string;
  description: string;
  mimeType: string;
  extension: string;
}

export const EXPORT_FORMAT_OPTIONS: ExportFormatOption[] = [
  {
    type: EXPORT_TYPES.CSV,
    label: "CSV",
    description: "Comma-separated values",
    mimeType: "text/csv",
    extension: ".csv",
  },
  {
    type: EXPORT_TYPES.EXCEL,
    label: "Excel",
    description: "Microsoft Excel format",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    extension: ".xlsx",
  },
  {
    type: EXPORT_TYPES.PDF,
    label: "PDF",
    description: "Portable Document Format",
    mimeType: "application/pdf",
    extension: ".pdf",
  },
  {
    type: EXPORT_TYPES.JSON,
    label: "JSON",
    description: "JavaScript Object Notation",
    mimeType: "application/json",
    extension: ".json",
  },
  {
    type: EXPORT_TYPES.TOON,
    label: "Toon",
    description: "Custom Toon format",
    mimeType: "application/octet-stream",
    extension: ".toon",
  },
];

/**
 * API mapping IDs from Interface API Guide
 */
export const EXPORT_CONFIG = {
  componentId: "69de77f507219f390b0e37df",
  moduleId: "69de77f507219f390b0e37e0",
  sectionId: "69e99737527ce7fcd606c560",
  interfaceId: "6a240a49fce183e19b5f69eb",
  brandServiceId: "6a325fd2eb297824bf0183ea",
  projectId: "68cbaab11eebc9ff240895c6",
} as const;

/**
 * Default pagination for export
 */
export const EXPORT_DEFAULT_PARAMS = {
  page: 1,
  pageLimit: 100,
} as const;

/**
 * Query key factory for React Query
 */
export const EXPORT_QUERY_KEYS = {
  export: (exportType: ExportType) => ["export", exportType] as const,
} as const;