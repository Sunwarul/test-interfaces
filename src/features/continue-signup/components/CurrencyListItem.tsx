import { Pressable, Text, View } from "react-native";
import { Check } from "@/utils/icons";
import { cn } from "@/utils/cn";
import type { Currency } from "../types";

interface CurrencyListItemProps {
  currency: Currency;
  isSelected: boolean;
  onSelect: (code: string) => void;
}

export function CurrencyListItem({
  currency,
  isSelected,
  onSelect,
}: CurrencyListItemProps) {
  return (
    <Pressable
      onPress={() => onSelect(currency.code)}
      className={cn(
        "flex-row items-center h-[60px] px-6 py-4 border-b border-border"
      )}
    >
      <View className="flex-1 flex-row items-center gap-2">
        <Text className="text-base font-medium text-text-primary">
          {currency.code}
        </Text>
        <Text className="text-base text-text-secondary">
          ({currency.name})
        </Text>
      </View>

      {/* Radio indicator */}
      <View
        className={cn(
          "w-10 h-10 rounded-full items-center justify-center",
          isSelected ? "bg-brand-purple p-1" : "bg-bg-black-10 p-1"
        )}
      >
        {isSelected && (
          <View className="w-full h-full bg-white rounded-full items-center justify-center">
            <Check className="text-brand-purple" size={20} />
          </View>
        )}
      </View>
    </Pressable>
  );
}