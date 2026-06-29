/**
 * ImportScreen
 * File import screen with document picker and upload
 */

import React, { useState } from "react";
import { Alert, View, Text } from "react-native";

import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { useImportEntity, usePickDocument } from "../hooks";
import { ImportOptions } from "../components/ImportOptions";
import { ImportButton } from "../components/ImportButton";
import type { SelectedFile } from "../types";

export default function ImportScreen() {
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const importMutation = useImportEntity();
  const { pickDocument } = usePickDocument();

  const handleSelectFile = async () => {
    const file = await pickDocument();
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const handleImport = () => {
    if (!selectedFile) {
      Alert.alert("Error", "Please select a file to import");
      return;
    }

    importMutation.mutate(selectedFile, {
      onSuccess: (result) => {
        Alert.alert(
          "Import Successful",
          result.message ??
            `Successfully imported ${result.recordsImported ?? 0} records.`
        );
        setSelectedFile(null);
      },
      onError: (error) => {
        Alert.alert(
          "Import Failed",
          error.message ?? "An error occurred during import."
        );
      },
    });
  };

  return (
    <AppShell
      header={
        <PageHeader
          title="Import Data"
          showBackButton
        />
      }
      scroll
    >
      <View className="gap-6">
        <View className="gap-2">
          <Text className="text-sm font-bold text-text-primary">
            Select File
          </Text>
          <Text className="text-sm text-text-secondary">
            Choose a file to import your data. Supported formats include CSV,
            Excel, and JSON.
          </Text>
        </View>

        <ImportOptions
          selectedFile={selectedFile}
          onSelectFile={handleSelectFile}
          onClearFile={handleClearFile}
          disabled={importMutation.isPending}
        />

        <View className="mt-4">
          <ImportButton
            onPress={handleImport}
            isLoading={importMutation.isPending}
            disabled={!selectedFile}
            label="Import Data"
          />
        </View>
      </View>
    </AppShell>
  );
}