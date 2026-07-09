// @ts-nocheck
/**
 * ImportButton Component
 * Primary action button with loading state
 */

import { Loader2 } from "lucide-react-native";
import { Pressable, Text } from "react-native";

import { cn } from "@/utils/cn";

interface ImportButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
}

/**
 * Primary action button for import operations
 * Shows loading state during import
 */
export function ImportButton({
  onPress,
  isLoading = false,
  disabled = false,
  label = "Import Data",
}: ImportButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      className={cn(
        "h-14 flex-row items-center justify-center gap-2 rounded-button bg-primary px-8",
        isDisabled && "opacity-50"
      )}
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      {isLoading ? (
        <>
          <Loader2 className="text-primary-foreground animate-spin" size={20} />
          <Text className="text-lg font-bold text-primary-foreground">
            Importing...
          </Text>
        </>
      ) : (
        <Text className="text-lg font-bold text-primary-foreground">{label}</Text>
      )}
    </Pressable>
  );
}
