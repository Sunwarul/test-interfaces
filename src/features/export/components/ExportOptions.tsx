/**
 * Export Options Component
 * Format selection UI for export types
 */

import { Pressable, Text, View } from "react-native";
import { Check } from "@/utils/icons";
import { cn } from "@/utils/cn";
import { EXPORT_FORMAT_OPTIONS, type ExportFormatOption, type ExportType } from "../config";

interface ExportOptionsProps {
  selectedType: ExportType;
  onSelect: (type: ExportType) => void;
}

export function ExportOptions({ selectedType, onSelect }: ExportOptionsProps) {
  return (
    <View className="gap-3">
      {EXPORT_FORMAT_OPTIONS.map((option) => (
        <ExportOptionItem
          key={option.type}
          option={option}
          isSelected={selectedType === option.type}
          onSelect={onSelect}
        />
      ))}
    </View>
  );
}

interface ExportOptionItemProps {
  option: ExportFormatOption;
  isSelected: boolean;
  onSelect: (type: ExportType) => void;
}

function ExportOptionItem({ option, isSelected, onSelect }: ExportOptionItemProps) {
  return (
    <Pressable
      onPress={() => onSelect(option.type)}
      className={cn(
        "flex-row items-center h-16 px-4 py-3 rounded-input border bg-surface",
        isSelected ? "border-primary" : "border-border"
      )}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={`${option.label} - ${option.description}`}
    >
      <View className="flex-1">
        <Text className="text-base font-medium text-text-primary">{option.label}</Text>
        <Text className="text-sm text-text-secondary mt-0.5">{option.description}</Text>
      </View>

      {/* Radio indicator */}
      <View
        className={cn(
          "w-6 h-6 rounded-full items-center justify-center",
          isSelected ? "bg-primary" : "bg-bg-black-10"
        )}
      >
        {isSelected && <Check className="text-white" size={16} />}
      </View>
    </Pressable>
  );
}