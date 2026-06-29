/**
 * Export Screen
 * File export with format selection
 */

import { useCallback, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { PageHeader } from "@/components/layout/PageHeader";
import { ExportOptions } from "../components/ExportOptions";
import { ExportButton } from "../components/ExportButton";
import { useExportAndShare } from "../hooks";
import type { RootStackParamList } from "@/navigation/types";
import type { ExportType } from "../config";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Screen texts
const SCREEN_TEXTS = {
  title: "Export Data",
  description: "Select a format to export your data",
  exportButton: "Export & Share",
} as const;

export default function ExportScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [selectedType, setSelectedType] = useState<ExportType>("csv");

  const { exportAndShare, isExporting, exportError } = useExportAndShare();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleExport = useCallback(async () => {
    try {
      const success = await exportAndShare(selectedType);

      if (success) {
        Alert.alert("Success", "Your data has been exported successfully.");
      } else if (exportError) {
        Alert.alert("Export Failed", exportError.message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "An unexpected error occurred";
      Alert.alert("Export Failed", message);
    }
  }, [exportAndShare, selectedType, exportError]);

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <PageHeader title={SCREEN_TEXTS.title} showBackButton onBackPress={handleBack} />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Description */}
          <Text className="text-base text-text-secondary leading-6 mb-8">
            {SCREEN_TEXTS.description}
          </Text>

          {/* Export Format Options */}
          <ExportOptions selectedType={selectedType} onSelect={setSelectedType} />
        </ScrollView>

        {/* Export Button */}
        <View className="px-6 pb-6">
          <ExportButton
            onPress={handleExport}
            isLoading={isExporting}
            label={SCREEN_TEXTS.exportButton}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}