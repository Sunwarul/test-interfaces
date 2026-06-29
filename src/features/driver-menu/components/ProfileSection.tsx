import { View, Text } from "react-native";
import { Avatar } from "./Avatar";
import { RatingBadge } from "./RatingBadge";
import { ChevronRight } from "@/utils/icons";

interface ProfileSectionProps {
  name: string;
  avatar?: string;
  rating: number;
  reviewCount: number;
  onPress?: () => void;
  className?: string;
}

export function ProfileSection({
  name,
  avatar,
  rating,
  reviewCount,
  onPress,
  className,
}: ProfileSectionProps) {
  return (
    <View className={`flex-row items-center px-6 py-4 gap-2 ${className ?? ""}`}>
      <Avatar uri={avatar} size={56} />
      <View className="flex-1 flex-col items-start justify-center">
        <Text className="text-2xl font-bold text-text-primary leading-8 tracking-[-0.48px]">
          {name}
        </Text>
        <View className="flex-row items-center gap-1 mt-1">
          <RatingBadge rating={rating} />
          <Text className="text-[13px] font-normal text-text-secondary leading-4">
            ({reviewCount})
          </Text>
        </View>
      </View>
      <ChevronRight className="text-text-primary" size={24} />
    </View>
  );
}