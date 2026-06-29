import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Menu } from "@/utils/icons";
import { ProfileSection } from "./ProfileSection";
import { MenuItem } from "./MenuItem";
import { SmallMenuItem } from "./SmallMenuItem";
import type { DriverProfile } from "../types";

interface DriverMenuDrawerProps {
  profile?: DriverProfile | null;
  onClose?: () => void;
  onMenuItemPress?: (item: string) => void;
  className?: string;
}

const mainMenuItems = [
  { id: "wallet", label: "Wallet" },
  { id: "orders", label: "Orders" },
  { id: "service-price", label: "Service Price" },
  { id: "earn-referring", label: "Earn By Referring" },
];

const smallMenuItems = [
  { id: "fleet-manager", label: "Become a Fleet Manager", icon: "users" as const },
  { id: "language", label: "Language", icon: "globe" as const },
  { id: "faq", label: "FAQ", icon: "headphones" as const },
  { id: "chat-support", label: "Chat with Support", icon: "message" as const },
];

export function DriverMenuDrawer({
  profile,
  onClose,
  onMenuItemPress,
  className,
}: DriverMenuDrawerProps) {
  const defaultProfile: DriverProfile = {
    id: "",
    name: "John Doe",
    rating: 4.8,
    reviewCount: 2148,
  };

  const currentProfile = profile ?? defaultProfile;

  return (
    <View className={`bg-white w-[374px] h-full flex-col justify-between pb-10 ${className ?? ""}`}>
      <SafeAreaView className="flex-1 flex-col" edges={["top"]}>
        {/* Top Section */}
        <View className="flex-col">
          {/* Menu Button */}
          <View className="flex-row items-start pt-[59px] pb-4 px-6">
            <Pressable
              onPress={onClose}
              className="w-14 h-14 bg-white items-center justify-center rounded-[32px] shadow-lg"
              accessibilityLabel="Close menu"
              accessibilityRole="button"
            >
              <Menu className="text-text-primary" size={24} />
            </Pressable>
          </View>

          {/* Profile Section */}
          <ProfileSection
            name={currentProfile.name ?? "John Doe"}
            avatar={currentProfile.avatar}
            rating={currentProfile.rating ?? 4.8}
            reviewCount={currentProfile.reviewCount ?? 2148}
            onPress={() => onMenuItemPress?.("profile")}
          />

          {/* Main Menu Items */}
          {mainMenuItems.map((item) => (
            <MenuItem
              key={item.id}
              label={item.label}
              onPress={() => onMenuItemPress?.(item.id)}
            />
          ))}
        </View>

        {/* Bottom Section - Small Menu Items */}
        <View className="flex-col">
          {smallMenuItems.map((item) => (
            <SmallMenuItem
              key={item.id}
              label={item.label}
              icon={item.icon}
              onPress={() => onMenuItemPress?.(item.id)}
            />
          ))}
        </View>
      </SafeAreaView>

      {/* Drag Handle Indicator */}
      <View className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-[100px] items-center justify-center">
        <View className="bg-bg-black-10 h-1.5 w-[100px] rounded-full rotate-90" />
      </View>
    </View>
  );
}