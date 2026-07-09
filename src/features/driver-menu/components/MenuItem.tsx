// @ts-nocheck
import { Pressable, Text } from "react-native";

interface MenuItemProps {
  label: string;
  onPress?: () => void;
  className?: string;
}

export function MenuItem({ label, onPress, className }: MenuItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center px-6 py-2 ${className ?? ""}`}
      accessibilityRole="menuitem"
    >
      <Text className="text-[32px] font-bold text-text-primary leading-10 tracking-[-0.96px]">
        {label}
      </Text>
    </Pressable>
  );
}
