// @ts-nocheck
import { View, TextInput, Pressable } from "react-native";
import { Search } from "@/utils/icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onFilterPress?: () => void;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search for a order",
  onFilterPress,
}: SearchBarProps) {
  return (
    <View className="flex-row items-center gap-2 px-6">
      <View className="flex-1 border border-border bg-white rounded-full min-h-12 px-4 py-3">
        <TextInput
          className="flex-1 text-base text-text-secondary tracking-[-0.16px]"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(0,0,0,0.6)"
          accessibilityLabel="Search orders"
        />
      </View>
      <Pressable
        className="w-12 h-12 bg-bg-black-5 rounded-full items-center justify-center"
        onPress={onFilterPress}
        accessibilityLabel="Filter orders"
        accessibilityRole="button"
      >
        <Search className="text-text-primary" size={24} />
      </Pressable>
    </View>
  );
}
