// @ts-nocheck
import { View, Text } from "react-native";

interface RatingBadgeProps {
  rating: number;
  className?: string;
}

export function RatingBadge({ rating, className }: RatingBadgeProps) {
  return (
    <View
      className={`bg-rating-yellow border border-white rounded-[18px] w-8 h-8 items-center justify-center ${className ?? ""}`}
    >
      <Text className="text-xs font-bold text-text-primary leading-4">
        {rating.toFixed(1)}
      </Text>
    </View>
  );
}
