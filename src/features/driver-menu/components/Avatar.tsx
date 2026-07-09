// @ts-nocheck
import { View, Image } from "react-native";
import { User } from "@/utils/icons";

interface AvatarProps {
  uri?: string;
  size?: number;
  className?: string;
}

export function Avatar({ uri, size = 56, className }: AvatarProps) {
  return (
    <View
      className={`relative rounded-full ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      {uri ? (
        <Image
          source={{ uri }}
          className="absolute inset-0 w-full h-full rounded-full"
          style={{ borderRadius: size / 2 }}
          resizeMode="cover"
        />
      ) : (
        <View
          className="absolute inset-0 bg-surface-muted rounded-full items-center justify-center"
          style={{ borderRadius: size / 2 }}
        >
          <User className="text-text-secondary" size={size * 0.5} />
        </View>
      )}
      {/* Status indicator */}
      <View
        className="absolute bg-white bottom-[-8px] left-[-8px] p-[5.333px] rounded-full shadow-md"
        style={{ borderRadius: size * 0.456 }}
      >
        <User className="text-text-primary" size={size * 0.19} />
      </View>
    </View>
  );
}
