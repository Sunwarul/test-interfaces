// @ts-nocheck
import { Text, Pressable } from "react-native";
import { Calendar } from "@/utils/icons";

interface DateRangeChipProps {
  startDate: string;
  endDate: string;
  onPress?: () => void;
}

export function DateRangeChip({
  startDate,
  endDate,
  onPress,
}: DateRangeChipProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Pressable
      className="flex-row items-center gap-1 bg-rating-yellow rounded-full px-4 py-2 min-h-8"
      onPress={onPress}
      accessibilityLabel={`Date range: ${formatDate(startDate)} to ${formatDate(endDate)}`}
      accessibilityRole="button"
    >
      <Text className="text-sm font-bold text-text-primary">
        {formatDate(startDate)} - {formatDate(endDate)}
      </Text>
      <Calendar className="text-text-primary" size={20} />
    </Pressable>
  );
}
