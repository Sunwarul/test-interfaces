// @ts-nocheck
/**
 * Export Feature Hooks
 * React Query hooks for export operations
 */

import { useMutation } from "@tanstack/react-query";
import * as Sharing from "expo-sharing";
import { exportEntity } from "../services";
import type { ExportResponse, ExportError } from "../types";
import type { ExportType } from "../config";

/**
 * Hook to export entity data as file
 * Uses React Query mutation for async export operation
 */
export function useExportEntity() {
  return useMutation<ExportResponse, ExportError, ExportType>({
    mutationFn: (exportType: ExportType) => exportEntity(exportType),
  });
}

/**
 * Hook to export and share entity data
 * Exports the file and opens the share dialog
 */
export function useExportAndShare() {
  const exportMutation = useExportEntity();

  const exportAndShare = async (exportType: ExportType): Promise<boolean> => {
    try {
      const result = await exportMutation.mutateAsync(exportType);

      if (result.fileUri && (await Sharing.isAvailableAsync())) {
        await Sharing.shareAsync(result.fileUri, {
          mimeType: result.contentType,
          dialogTitle: `Export ${exportType.toUpperCase()}`,
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Export and share failed:", error);
      return false;
    }
  };

  return {
    exportAndShare,
    isExporting: exportMutation.isPending,
    exportError: exportMutation.error,
    exportResult: exportMutation.data,
  };
}
