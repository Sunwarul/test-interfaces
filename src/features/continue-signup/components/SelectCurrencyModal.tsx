// @ts-nocheck
/**
 * Select Currency Modal Component
 * Currency selection with search functionality
 */

import { FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Search, X } from "@/utils/icons";
import { CurrencyListItem } from "./CurrencyListItem";
import { useContinueSignUpStore } from "../store";
import type { Currency } from "../types";

interface SelectCurrencyModalProps {
  currencies: Currency[];
  onSelect: (code: string) => void;
}

export function SelectCurrencyModal({ currencies, onSelect }: SelectCurrencyModalProps) {
  const {
    currency,
    isCurrencyModalVisible,
    currencySearchQuery,
    setCurrencyModalVisible,
    setCurrencySearchQuery,
  } = useContinueSignUpStore();

  const filteredCurrencies = (() => {
    if (!currencySearchQuery.trim()) {
      return currencies;
    }

    const query = currencySearchQuery.toLowerCase();
    return currencies.filter(
      (c) =>
        c.code.toLowerCase().includes(query) ||
        c.name.toLowerCase().includes(query)
    );
  })();

  const handleClose = () => {
    setCurrencyModalVisible(false);
    setCurrencySearchQuery("");
  };

  const handleSelect = (code: string) => {
    onSelect(code);
    handleClose();
  };

  return (
    <Modal
      visible={isCurrencyModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <SafeAreaView className="flex-1 bg-surface">
        {/* Header */}
        <View className="flex-row items-center px-2 py-2 border-b border-border">
          <Pressable
            onPress={handleClose}
            className="w-14 h-14 items-center justify-center rounded-full"
            accessibilityLabel="Close"
            accessibilityRole="button"
          >
            <ChevronLeft className="text-text-primary" size={24} />
          </Pressable>
          <Text className="flex-1 text-2xl font-bold text-text-primary text-center pr-14">
            Select Currency
          </Text>
        </View>

        {/* Search */}
        <View className="mx-6 mt-4 h-10 flex-row items-center px-4 bg-bg-black-5 rounded-input gap-2">
          <Search className="text-text-muted" size={20} />
          <TextInput
            className="flex-1 text-base text-text-primary"
            placeholder="Search currency"
            placeholderTextColor="rgba(0,0,0,0.4)"
            value={currencySearchQuery}
            onChangeText={setCurrencySearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {currencySearchQuery.length > 0 && (
            <Pressable onPress={() => setCurrencySearchQuery("")}>
              <X className="text-text-muted" size={20} />
            </Pressable>
          )}
        </View>

        {/* Currency List */}
        <FlatList
          data={filteredCurrencies}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <CurrencyListItem
              currency={item}
              isSelected={currency === item.code}
              onSelect={handleSelect}
            />
          )}
          className="flex-1 mt-4"
          contentContainerStyle={{ paddingBottom: 24 }}
          ListEmptyComponent={
            <View className="py-8 items-center">
              <Text className="text-base text-text-secondary">
                No currencies found
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </Modal>
  );
}