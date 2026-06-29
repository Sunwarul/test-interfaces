/**
 * Export Button Component
 * Trigger button with loading state
 */

import { ActivityIndicator, Pressable, Text } from "react-native";
import { Download } from "@/utils/icons";
import { cn } from "@/utils/cn";

interface ExportButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
}

export function ExportButton({
  onPress,
  isLoading = false,
  disabled = false,
  label = "Export",
}: ExportButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={cn(
        "h-14 px-6 rounded-button items-center justify-center flex-row gap-2",
        isDisabled ? "bg-bg-black-10" : "bg-primary"
      )}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled }}
    >
      {isLoading ? (
        <ActivityIndicator className="text-white" size="small" />
      ) : (
        <Download className={cn("size-5", isDisabled ? "text-text-black-20" : "text-white")} />
      )}
      <Text
        className={cn(
          "text-lg font-bold tracking-[-0.2px]",
          isDisabled ? "text-text-black-20" : "text-white"
        )}
      >
        {isLoading ? "Exporting..." : label}
      </Text>
    </Pressable>
  );
}