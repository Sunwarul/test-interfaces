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
