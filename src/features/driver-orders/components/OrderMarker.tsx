// @ts-nocheck
import { View } from "react-native";
import { cssInterop } from "nativewind";
import { LogIn, LogOut } from "lucide-react-native";

cssInterop(LogIn, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, width: true, height: true },
  },
});
cssInterop(LogOut, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, width: true, height: true },
  },
});

interface OrderMarkerProps {
  type: "pickup" | "dropoff";
  size?: number;
}

export function OrderMarker({ type, size = 24 }: OrderMarkerProps) {
  const isPickup = type === "pickup";
  const backgroundColor = isPickup ? "bg-primary" : "bg-text-primary";
  const Icon = isPickup ? LogOut : LogIn;

  return (
    <View
      className={`${backgroundColor} rounded-full items-center justify-center shrink-0`}
      style={{ width: size, height: size }}
      accessibilityLabel={isPickup ? "Pickup location" : "Dropoff location"}
    >
      <Icon className="text-white" size={size * 0.65} />
    </View>
  );
}
