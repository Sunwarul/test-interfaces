import { Pressable, Text, View } from "react-native";
import { Globe, Headphones, MessageCircle, Users } from "@/utils/icons";

type IconType = 'users' | 'globe' | 'headphones' | 'message';

interface SmallMenuItemProps {
  label: string;
  icon: IconType;
  onPress?: () => void;
  className?: string;
}

const iconMap: Record<IconType, React.ComponentType<{ className?: string; size?: number }>> = {
  users: Users,
  globe: Globe,
  headphones: Headphones,
  message: MessageCircle,
};

export function SmallMenuItem({ label, icon, onPress, className }: SmallMenuItemProps) {
  const IconComponent = iconMap[icon];

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center px-6 py-2 gap-2 ${className ?? ""}`}
      accessibilityRole="menuitem"
    >
      <View className="w-6 h-6">
        <IconComponent className="text-text-primary" size={24} />
      </View>
      <Text className="text-base font-normal text-text-primary leading-6 tracking-[-0.16px]">
        {label}
      </Text>
    </Pressable>
  );
}