/**
 * Import Feature Hooks
 * React Query hooks for import operations
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as DocumentPicker from "expo-document-picker";
import { importEntity } from "../services";
import { IMPORT_QUERY_KEYS } from "../config";
import type { ImportError, ImportResponse, SelectedFile } from "../types";

/**
 * Hook to import entity data from file
 * Uses React Query mutation for async import operation
 */
export function useImportEntity() {
  const queryClient = useQueryClient();

  return useMutation<ImportResponse, ImportError, SelectedFile>({
    mutationFn: (file: SelectedFile) => importEntity(file),
    onSuccess: () => {
      // Invalidate any list queries after successful import
      queryClient.invalidateQueries({ queryKey: IMPORT_QUERY_KEYS.import });
    },
  });
}

/**
 * Hook to pick a document file for import
 * Uses expo-document-picker
 */
export function usePickDocument() {
  const pickDocument = async (): Promise<SelectedFile | null> => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.[0]) {
        return null;
      }

      const asset = result.assets[0];

      return {
        uri: asset.uri,
        name: asset.name ?? "upload",
        mimeType: asset.mimeType ?? "application/octet-stream",
        size: asset.size,
      };
    } catch (error) {
      console.error("Document pick failed:", error);
      return null;
    }
  };

  return { pickDocument };
}