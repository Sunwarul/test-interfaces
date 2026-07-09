// @ts-nocheck
/**
 * ImportOptions Component
 * File selection display with file info
 */

import { FileText, X } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { cn } from "@/utils/cn";
import type { SelectedFile } from "../types";

interface ImportOptionsProps {
  selectedFile: SelectedFile | null;
  onSelectFile: () => void;
  onClearFile: () => void;
  disabled?: boolean;
}

/**
 * Format file size to human readable string
 */
function formatFileSize(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Get file extension from filename
 */
function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? `.${parts[parts.length - 1].toUpperCase()}` : "";
}

export function ImportOptions({
  selectedFile,
  onSelectFile,
  onClearFile,
  disabled = false,
}: ImportOptionsProps) {
  if (selectedFile) {
    return (
      <View className="rounded-input border border-border bg-surface p-4">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 items-center justify-center rounded-2xl bg-bg-black-5">
            <FileText className="text-text-secondary" size={24} />
          </View>
          <View className="flex-1">
            <Text
              className="text-base font-medium text-text-primary"
              numberOfLines={1}
            >
              {selectedFile.name}
            </Text>
            <Text className="text-sm text-text-secondary">
              {getFileExtension(selectedFile.name)}
              {selectedFile.size ? ` • ${formatFileSize(selectedFile.size)}` : ""}
            </Text>
          </View>
          <Pressable
            onPress={onClearFile}
            disabled={disabled}
            className={cn(
              "h-8 w-8 items-center justify-center rounded-full",
              disabled && "opacity-50"
            )}
            accessibilityLabel="Remove file"
            accessibilityRole="button"
          >
            <X className="text-text-secondary" size={20} />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <Pressable
      onPress={onSelectFile}
      disabled={disabled}
      className={cn(
        "rounded-input border border-border border-dashed bg-surface p-6",
        disabled && "opacity-50"
      )}
      accessibilityLabel="Select file to import"
      accessibilityRole="button"
    >
      <View className="items-center gap-3">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-bg-black-5">
          <FileText className="text-text-secondary" size={28} />
        </View>
        <View className="items-center gap-1">
          <Text className="text-base font-medium text-text-primary">
            Select a file to import
          </Text>
          <Text className="text-sm text-text-secondary">
            Tap to browse your files
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
