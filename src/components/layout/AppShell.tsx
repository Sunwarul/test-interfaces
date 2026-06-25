import type { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { cn } from "@/utils/cn";

interface AppShellProps {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  scroll?: boolean;
  className?: string;
  contentClassName?: string;
}

export function AppShell({
  children,
  header,
  footer,
  scroll = true,
  className,
  contentClassName,
}: AppShellProps) {
  const content = scroll ? (
    <ScrollView
      className="flex-1"
      contentContainerClassName={cn("px-screen py-4", contentClassName)}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  ) : (
    <View className={cn("flex-1 px-screen py-4", contentClassName)}>{children}</View>
  );

  return (
    <SafeAreaView className={cn("flex-1 bg-background", className)}>
      <StatusBar style="dark" />
      {header}
      {content}
      {footer}
    </SafeAreaView>
  );
}
