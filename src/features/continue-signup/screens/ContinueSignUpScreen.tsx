/**
 * Continue Sign Up Screen
 * Fleet Manager registration form with VALIDATE and CREATE API integration
 */

import { useCallback, useMemo } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react-native";

import { PageHeader } from "@/components/layout/PageHeader";
import { SelectCurrencyModal } from "@/features/continue-signup/components/SelectCurrencyModal";
import { useContinueSignUpStore } from "@/features/continue-signup/store";
import { useCreateEntity, useValidateEntity } from "@/features/continue-signup/hooks";
import {
  continueSignUpSchema,
  type ContinueSignUpFormValues,
  type Currency,
} from "@/features/continue-signup/types";
import type { RootStackParamList } from "@/navigation/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Default currencies from Figma design
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
  firstNameLabel: "First Name *",
  lastNameLabel: "Last Name *",
  currencyLabel: "Currency *",
  firstNameError: "Please enter your first name",
  lastNameError: "Please enter your last name",
  currencyError: "Please select a currency",
} as const;

export default function ContinueSignUpScreen() {
  const navigation = useNavigation<NavigationProp>();
  const {
    currency,
    setCurrency,
    setCurrencyModalVisible,
  } = useContinueSignUpStore();

  const currencies = DEFAULT_CURRENCIES;

  const selectedCurrency = useMemo(() => {
    return currencies.find((c) => c.code === currency);
  }, [currencies, currency]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContinueSignUpFormValues>({
    resolver: zodResolver(continueSignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      currency: "",
    },
    mode: "onBlur",
  });

  const validateEntity = useValidateEntity();
  const createEntity = useCreateEntity();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCurrencyPress = useCallback(() => {
    setCurrencyModalVisible(true);
  }, [setCurrencyModalVisible]);

  const handleCurrencySelect = useCallback(
    (code: string) => {
      setCurrency(code);
      setValue("currency", code, { shouldValidate: true });
    },
    [setCurrency, setValue]
  );

  const onSubmit = useCallback(
    (data: ContinueSignUpFormValues) => {
      // First validate the fields
      validateEntity.mutate(
        {
          checks: [
            { field: "firstName", value: data.firstName },
            { field: "lastName", value: data.lastName },
          ],
          match_mode: "each",
        },
        {
          onSuccess: () => {
            // Validation passed, proceed with create
            createEntity.mutate(data, {
              onSuccess: (response) => {
                // Navigate on success
                console.log("Entity created:", response.data.main.id);
                // Add navigation logic here based on app flow
              },
              onError: (error) => {
                // Handle create error
                console.error("Create failed:", error.message);
              },
            });
          },
          onError: (error) => {
            // Handle validation error
            console.error("Validation failed:", error.message);
          },
        }
      );
    },
    [validateEntity, createEntity]
  );

  const isSubmitting = validateEntity.isPending || createEntity.isPending;
  const isFormValid = watch("firstName") && watch("lastName") && watch("currency");

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
            {/* First Name Field */}
            <View className="gap-2">
              <Text className="text-[13px] font-bold leading-4 text-text-primary">
                {SCREEN_TEXTS.firstNameLabel}
              </Text>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`min-h-12 px-4 py-3 rounded-input border bg-surface ${
                      errors.firstName ? "border-border-focus" : "border-border"
                    }`}
                  >
                    <TextInput
                      className={`text-base leading-6 tracking-[-0.16px] flex-1 ${
                        value ? "text-text-primary" : "text-text-secondary"
                      }`}
                      value={value}
                      placeholder={SCREEN_TEXTS.firstNamePlaceholder}
                      placeholderTextColor="rgba(0,0,0,0.6)"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                      autoCorrect={false}
                    />
                  </View>
                )}
              />
              {errors.firstName && (
                <View className="flex-row items-center gap-1 px-4">
                  <Text className="text-[13px] leading-4 text-error">
                    {errors.firstName.message}
                  </Text>
                </View>
              )}
            </View>

            {/* Last Name Field */}
            <View className="gap-2">
              <Text className="text-[13px] font-bold leading-4 text-text-primary">
                {SCREEN_TEXTS.lastNameLabel}
              </Text>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    className={`min-h-12 px-4 py-3 rounded-input border bg-surface ${
                      errors.lastName ? "border-border-focus" : "border-border"
                    }`}
                  >
                    <TextInput
                      className={`text-base leading-6 tracking-[-0.16px] flex-1 ${
                        value ? "text-text-primary" : "text-text-secondary"
                      }`}
                      value={value}
                      placeholder={SCREEN_TEXTS.lastNamePlaceholder}
                      placeholderTextColor="rgba(0,0,0,0.6)"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                      autoCorrect={false}
                    />
                  </View>
                )}
              />
              {errors.lastName && (
                <View className="flex-row items-center gap-1 px-4">
                  <Text className="text-[13px] leading-4 text-error">
                    {errors.lastName.message}
                  </Text>
                </View>
              )}
            </View>

            {/* Currency Field */}
            <View className="gap-2">
              <Text className="text-[13px] font-bold leading-4 text-text-primary">
                {SCREEN_TEXTS.currencyLabel}
              </Text>
              <Pressable onPress={handleCurrencyPress}>
                <View
                  className={`min-h-12 px-4 py-3 rounded-input border bg-surface flex-row items-center ${
                    errors.currency ? "border-border-focus" : "border-border"
                  }`}
                >
                  <Text
                    className={`text-base leading-6 tracking-[-0.16px] flex-1 ${
                      selectedCurrency
                        ? "text-text-primary"
                        : "text-text-secondary"
                    }`}
                  >
                    {selectedCurrency
                      ? `${selectedCurrency.code} - ${selectedCurrency.name}`
                      : SCREEN_TEXTS.currencyPlaceholder}
                  </Text>
                  <ChevronDown className="text-text-secondary" size={20} />
                </View>
              </Pressable>
              {errors.currency && (
                <View className="flex-row items-center gap-1 px-4">
                  <Text className="text-[13px] leading-4 text-error">
                    {errors.currency.message}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <View className="px-6 pb-6">
          <Pressable
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || !isFormValid}
            className={`h-14 rounded-button items-center justify-center ${
              isFormValid && !isSubmitting ? "bg-primary" : "bg-bg-black-10"
            }`}
            accessibilityLabel={SCREEN_TEXTS.submitButton}
            accessibilityRole="button"
          >
            <Text
              className={`text-xl font-bold leading-6 tracking-[-0.2px] ${
                isFormValid && !isSubmitting
                  ? "text-white"
                  : "text-text-black-20"
              }`}
            >
              {isSubmitting ? "Submitting..." : SCREEN_TEXTS.submitButton}
            </Text>
          </Pressable>
        </View>

        {/* Currency Modal */}
        <SelectCurrencyModal
          currencies={currencies}
          onSelect={handleCurrencySelect}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}