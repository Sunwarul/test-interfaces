import { View, Text, Pressable } from "react-native";
import { OrderMarker } from "./OrderMarker";
import type { OrderItem } from "../types";

interface OrderRowProps {
  order: OrderItem;
  onPress?: () => void;
}

export function OrderRow({ order, onPress }: OrderRowProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const formatPrice = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };

  return (
    <Pressable
      className="border-b border-border px-6 py-4"
      onPress={onPress}
      accessibilityLabel={`Order ${order.orderNumber}, ${order.itemCount} items, ${formatPrice(order.price)}`}
      accessibilityRole="button"
    >
      {/* Main Info Row */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1">
          <Text className="text-base font-semibold text-text-primary tracking-[-0.16px]">
            {order.orderNumber} — {order.itemCount} {order.itemCount === 1 ? "Item" : "Items"}
          </Text>
          <Text className="text-sm text-text-secondary mt-0.5">
            {formatTime(order.pickupTime)} | {formatTime(order.dropoffTime)}
          </Text>
        </View>
        <Text className="text-base font-medium text-text-primary tracking-[-0.16px]">
          {formatPrice(order.price)}
        </Text>
      </View>

      {/* Addresses */}
      <View className="gap-1">
        {/* Pickup Address */}
        <View className="flex-row items-center gap-2">
          <OrderMarker type="pickup" size={24} />
          <Text
            className="flex-1 text-sm text-text-secondary truncate"
            numberOfLines={1}
          >
            {order.pickupAddress.address}
          </Text>
        </View>

        {/* Dropoff Address */}
        <View className="flex-row items-center gap-2">
          <OrderMarker type="dropoff" size={24} />
          <Text
            className="flex-1 text-sm text-text-secondary truncate"
            numberOfLines={1}
          >
            {order.dropoffAddress.address}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}