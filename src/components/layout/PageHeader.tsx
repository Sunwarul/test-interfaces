import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChevronLeft } from "@/utils/icons";
import type { RootStackParamList } from "@/navigation/types";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  showBackButton?: boolean;
  onBackPress?: () => void;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function PageHeader({
  title,
  subtitle,
  action,
  showBackButton = false,
  onBackPress,
}: PageHeaderProps) {
  const navigation = useNavigation<NavigationProp>();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View className="flex-row items-center px-2 pt-[59px] pb-4">
      {showBackButton ? (
        <Pressable
          onPress={handleBack}
          className="w-14 h-14 items-center justify-center rounded-full"
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ChevronLeft className="text-text-primary" size={24} />
        </Pressable>
      ) : (
        <View className="w-14 h-14" />
      )}
      <Text className="flex-1 text-2xl font-bold text-text-primary tracking-[-0.48px] pr-14">
        {title}
      </Text>
      {action}
    </View>
  );
}