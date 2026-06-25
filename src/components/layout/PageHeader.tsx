import type { ReactNode } from "react";
import { Text, View } from "react-native";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <View className="border-b border-border bg-surface px-screen py-4">
      <View className="flex-row items-center justify-between gap-3">
        <View className="min-w-0 flex-1">
          <Text className="text-2xl font-semibold text-text-primary">{title}</Text>
          {subtitle ? (
            <Text className="mt-1 text-sm text-text-secondary">{subtitle}</Text>
          ) : null}
        </View>
        {action}
      </View>
    </View>
  );
}
