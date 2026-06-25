import { Pressable, Text, View } from "react-native";

import { cn } from "@/utils/cn";

export interface TabBarItem {
  label: string;
  active?: boolean;
  onPress: () => void;
}

interface TabBarProps {
  items: TabBarItem[];
}

export function TabBar({ items }: TabBarProps) {
  return (
    <View className="border-t border-border bg-surface px-screen py-2">
      <View className="flex-row items-center justify-around">
        {items.map((item) => (
          <Pressable
            accessibilityLabel={item.label}
            accessibilityRole="tab"
            accessibilityState={{ selected: item.active === true }}
            className={cn(
              "min-h-11 min-w-20 items-center justify-center rounded-card px-3",
              item.active ? "bg-primary" : "bg-transparent",
            )}
            key={item.label}
            onPress={item.onPress}
          >
            <Text
              className={cn(
                "text-sm font-medium",
                item.active ? "text-primary-foreground" : "text-text-secondary",
              )}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
