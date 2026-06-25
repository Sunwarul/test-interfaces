import { useEffect } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { PageHeader } from "@/components/layout/PageHeader";
import { FormField } from "@/features/continue-signup/components/FormField";
import { SelectCurrencyModal } from "@/features/continue-signup/components/SelectCurrencyModal";
import { useContinueSignUp, useSelectedCurrency } from "@/features/continue-signup/hooks";
import { SCREEN_TEXTS, PLACEHOLDERS } from "@/features/continue-signup/mocks/fixtures";
import { submitForm, fetchEntityIds } from "@/features/continue-signup/actions";
import type { RootStackParamList } from "@/navigation/types";
import { cn } from "@/utils/cn";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ContinueSignUpScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {
    firstName,
    lastName,
    currency,
    errors,
    isSubmitting,
    isLoading,
    setFirstName,
    setLastName,
    setCurrencyModalVisible,
  } = useContinueSignUp();

  const selectedCurrency = useSelectedCurrency();

  // Fetch entity IDs on mount
  useEffect(() => {
    fetchEntityIds();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleCurrencyPress = () => {
    setCurrencyModalVisible(true);
  };

  const handleSubmit = async () => {
    const success = await submitForm({
      firstName,
      lastName,
      currency,
    });

    if (success) {
      console.log("Form submitted successfully");
    }
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
              placeholder={PLACEHOLDERS.firstName}
              error={errors.firstName}
              onChangeText={setFirstName}
            />

            <FormField
              label="Last Name *"
              value={lastName}
              placeholder={PLACEHOLDERS.lastName}
              error={errors.lastName}
              onChangeText={setLastName}
            />

            <FormField
              label="Currency *"
              value={selectedCurrency ? `${selectedCurrency.code} - ${selectedCurrency.name}` : ""}
              placeholder={PLACEHOLDERS.currency}
              error={errors.currency}
              onPress={handleCurrencyPress}
              showChevron
            />
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View className="px-6 pb-6">
          <Pressable
            onPress={handleSubmit}
            disabled={isSubmitting || isLoading}
            className={cn(
              "h-14 rounded-button items-center justify-center",
              isFormValid && !isSubmitting && !isLoading
                ? "bg-brand-purple"
                : "bg-bg-black-10"
            )}
            accessibilityLabel={SCREEN_TEXTS.submitButton}
            accessibilityRole="button"
          >
            <Text
              className={cn(
                "text-xl font-bold leading-6 tracking-[-0.2px]",
                isFormValid && !isSubmitting && !isLoading
                  ? "text-white"
                  : "text-text-black-20"
              )}
            >
              {isSubmitting ? "Submitting..." : isLoading ? "Loading..." : SCREEN_TEXTS.submitButton}
            </Text>
          </Pressable>
        </View>

        {/* Currency Modal */}
        <SelectCurrencyModal />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}