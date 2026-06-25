import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { AlertCircle, ChevronDown } from "@/utils/icons";
import { cn } from "@/utils/cn";

interface FormFieldProps {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  showChevron?: boolean;
  helperIcon?: ReactNode;
}

export function FormField({
  label,
  value,
  placeholder,
  error,
  onPress,
  onChangeText,
  editable = true,
  showChevron = false,
}: FormFieldProps) {
  const hasError = !!error;
  const isEmpty = !value;

  const containerClasses = cn(
    "min-h-12 px-4 py-3 rounded-input border bg-surface",
    hasError
      ? "border-border-focus"
      : "border-border",
    !editable && "opacity-60"
  );

  const textClasses = cn(
    "text-base leading-6 tracking-[-0.16px] flex-1",
    isEmpty ? "text-text-secondary" : "text-text-primary"
  );

  const content = (
    <View className={containerClasses}>
      <View className="flex-row items-center gap-2">
        <View className="flex-1">
          {onChangeText ? (
            <Pressable onPress={onPress} className="flex-row items-center">
              <Text
                className={textClasses}
                onPress={() => onPress?.()}
              >
                {value || placeholder}
              </Text>
            </Pressable>
          ) : (
            <Text className={textClasses}>{value || placeholder}</Text>
          )}
        </View>
        {showChevron && (
          <ChevronDown className="text-text-secondary" size={20} />
        )}
      </View>
    </View>
  );

  return (
    <View className="gap-2">
      <Text className="text-[13px] font-bold leading-4 text-text-primary">
        {label}
      </Text>
      
      {onPress && !onChangeText ? (
        <Pressable onPress={onPress}>{content}</Pressable>
      ) : (
        <Pressable onPress={onPress}>{content}</Pressable>
      )}

      {hasError && (
        <View className="flex-row items-center gap-1 px-4">
          <AlertCircle className="text-error" size={16} />
          <Text className="text-[13px] leading-4 text-error">{error}</Text>
        </View>
      )}
    </View>
  );
}