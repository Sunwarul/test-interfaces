// @ts-nocheck
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import type { RootStackParamList } from "@/navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SCREENS = [
  {
    name: "ContinueSignUp" as const,
    title: "Continue Signing Up",
    description: "Fleet Manager registration form with currency selection",
  },
  {
    name: "Export" as const,
    title: "Export Data",
    description: "Export entity data in various formats (CSV, Excel, PDF, JSON)",
  },
  {
    name: "Import" as const,
    title: "Import Data",
    description: "Import entity data from file (CSV, Excel, JSON)",
  },
  {
    name: "DriverMenu" as const,
    title: "Driver Menu Drawer",
    description: "Driver app menu drawer with profile, wallet, orders, and support options",
  },
  {
    name: "DriverOrders" as const,
    title: "Driver Orders",
    description: "Orders list with earnings chart, tabs, search, and date range filter",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <AppShell
      header={
        <PageHeader
          title="Generated Screens"
          subtitle="React Native screens generated from Figma"
        />
      }
    >
      <View className="gap-3">
        {SCREENS.map((screen) => (
          <Pressable
            key={screen.name}
            onPress={() => navigation.navigate(screen.name)}
            className="rounded-card border border-border bg-surface p-card"
          >
            <Text className="text-base font-semibold text-text-primary">
              {screen.title}
            </Text>
            <Text className="mt-1 text-sm text-text-secondary">
              {screen.description}
            </Text>
          </Pressable>
        ))}
      </View>
    </AppShell>
  );
}
