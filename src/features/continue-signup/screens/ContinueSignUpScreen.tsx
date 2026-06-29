/**
 * Continue Sign Up Screen
 * Fleet Manager registration form with currency selection
 */

import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PageHeader } from "@/components/layout/PageHeader";
import { FormField } from "@/features/continue-signup/components/FormField";
import { SelectCurrencyModal } from "@/features/continue-signup/components/SelectCurrencyModal";
import { useContinueSignUpStore } from "@/features/continue-signup/store";
import type { RootStackParamList } from "@/navigation/types";
import type { Currency } from "@/features/continue-signup/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Default currencies from Figma design (when API enum is not available)
const DEFAULT_CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "ALL", name: "Albanian Lek" },
  { code: "DZD", name: "Algerian Dinar" },
  { code: "AOA", name: "Angolan Kwanza" },
  { code: "XCD", name: "Eastern Caribbean Dollar" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "AMD", name: "Armenian Dram" },
  { code: "AWG", name: "Aruban Florin" },
  { code: "AUD", name: "Australia Dollar" },
  { code: "AZN", name: "Azerbaijan Manat" },
];

// Screen texts
const SCREEN_TEXTS = {
  title: "Continue Signing Up",
  description: "Please enter your name as it appears on your ID or passport",
  submitButton: "Continue as a Fleet Manager",
  firstNamePlaceholder: "Enter first name",
  lastNamePlaceholder: "Enter last name",
  currencyPlaceholder: "Select currency",
} as const;

export default function ContinueSignUpScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {
    firstName,
    lastName,
    currency,
    setFirstName,
    setLastName,
    setCurrency,
    setCurrencyModalVisible,
  } = useContinueSignUpStore();

  // Get currencies - in production, these would come from API enum
  const currencies = DEFAULT_CURRENCIES;

  // Get selected currency display
  const selectedCurrency = currencies.find((c) => c.code === currency);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCurrencyPress = () => {
    setCurrencyModalVisible(true);
  };

  const handleSubmit = () => {
    // In production, this would call the validate/create API
    console.log("Form submitted:", { firstName, lastName, currency });
  };

  const isFormValid = firstName.trim() && lastName.trim() && currency;

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <PageHeader
          title={SCREEN_TEXTS.title}
          showBackButton
          onBackPress={handleBack}
        />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Description */}
          <Text className="text-base text-text-secondary leading-6 mb-10">
            {SCREEN_TEXTS.description}
          </Text>

          {/* Form Fields */}
          <View className="gap-4">
            <FormField
              label="First Name *"
              value={firstName}
              placeholder={SCREEN_TEXTS.firstNamePlaceholder}
              onChangeText={setFirstName}
            />

            <FormField
              label="Last Name *"
              value={lastName}
              placeholder={SCREEN_TEXTS.lastNamePlaceholder}
              onChangeText={setLastName}
            />

            <FormField
              label="Currency *"
              value={selectedCurrency ? `${selectedCurrency.code} - ${selectedCurrency.name}` : ""}
              placeholder={SCREEN_TEXTS.currencyPlaceholder}
              onPress={handleCurrencyPress}
              showChevron
            />
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View className="px-6 pb-6">
          <Pressable
            onPress={handleSubmit}
            disabled={!isFormValid}
            className={`h-14 rounded-button items-center justify-center ${
              isFormValid ? "bg-primary" : "bg-bg-black-10"
            }`}
            accessibilityLabel={SCREEN_TEXTS.submitButton}
            accessibilityRole="button"
          >
            <Text
              className={`text-xl font-bold leading-6 tracking-[-0.2px] ${
                isFormValid ? "text-white" : "text-text-black-20"
              }`}
            >
              {SCREEN_TEXTS.submitButton}
            </Text>
          </Pressable>
        </View>

        {/* Currency Modal */}
        <SelectCurrencyModal currencies={currencies} onSelect={setCurrency} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}