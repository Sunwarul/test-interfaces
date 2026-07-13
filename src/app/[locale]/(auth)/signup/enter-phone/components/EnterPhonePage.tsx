"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "./PhoneInput";
import { SocialLoginButtons } from "./SocialLoginButtons";
import { FleetManagerBadge } from "./FleetManagerBadge";
import { usePhoneValidation } from "../hooks/usePhoneValidation";
import { useCountries } from "../hooks/useCountrySearch";
import type { Country } from "../types/enter-phone.types";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export function EnterPhonePage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const countries = useCountries();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Set default country (India)
  useEffect(() => {
    const defaultCountry = countries.find((c) => c.code === "IN");
    if (defaultCountry && !selectedCountry) {
      setSelectedCountry(defaultCountry);
    }
  }, [countries, selectedCountry]);

  // Debounced phone validation
  const handlePhoneChange = useCallback(
    (value: string) => {
      setPhoneNumber(value);
      setValidationError(null);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (value.length >= 8) {
        debounceRef.current = setTimeout(() => {
          // Validation will be handled by the hook
        }, 500);
      }
    },
    []
  );

  // Phone validation hook
  const fullPhoneNumber = selectedCountry
    ? `${selectedCountry.dialCode}${phoneNumber}`
    : phoneNumber;

  const { data: validationData, isLoading: isValidating } = usePhoneValidation(
    phoneNumber.length >= 8 ? fullPhoneNumber : null
  );

  // Check validation result
  useEffect(() => {
    if (validationData?.data?.checks?.[0]) {
      const check = validationData.data.checks[0];
      if (check.exists) {
        setValidationError("This phone number is already registered");
      } else {
        setValidationError(null);
      }
    }
  }, [validationData]);

  const handleContinue = () => {
    if (!phoneNumber || phoneNumber.length < 8) {
      setValidationError("Please enter a valid phone number");
      return;
    }

    if (validationData?.data?.checks?.[0]?.exists) {
      setValidationError("This phone number is already registered");
      toast.error("This phone number is already registered");
      return;
    }

    // Proceed to next step
    toast.success("Phone number verified!");
    // In a real app, this would navigate to OTP verification or next signup step
    // router.push("/signup/verify-otp");
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-6 px-2 pr-6 pt-[59px] pb-4">
        <button
          onClick={() => router.back()}
          className="w-[56px] h-[56px] rounded-[32px] flex items-center justify-center p-[8px] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-[24px] font-bold tracking-[-0.48px]">
          Fleet Manager
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-6">
        {/* Fleet Manager Badge */}
        <div className="mt-[195px] mb-10">
          <FleetManagerBadge />
        </div>

        {/* Form */}
        <div className="w-full max-w-[366px] space-y-6">
          {/* Phone Input */}
          <PhoneInput
            value={phoneNumber}
            onChange={handlePhoneChange}
            country={selectedCountry}
            onCountryChange={handleCountrySelect}
            error={validationError || undefined}
            placeholder="Phone Number"
          />

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[rgba(0,0,0,0.1)]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-[rgba(0,0,0,0.4)] text-[16px]">
                or
              </span>
            </div>
          </div>

          {/* Social Login */}
          <SocialLoginButtons />
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-[62px] text-center">
        <p className="text-[13px] text-[rgba(0,0,0,0.6)]">
          We're committed to your privacy. By Signing Up you agree to our{" "}
          <a href="#" className="font-medium text-black underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="font-medium text-black underline">
            Terms and Conditions
          </a>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 px-6 pb-8 space-y-3">
        <Button
          onClick={handleContinue}
          disabled={isValidating || !phoneNumber || !!validationError}
          className="w-full h-[56px] rounded-[32px] bg-[var(--color-brand-purple,#6054ba)] text-white text-[20px] font-bold hover:bg-[var(--color-brand-purple,#6054ba)]/90 disabled:opacity-50"
        >
          {isValidating ? "Verifying..." : "Continue as a Fleet Manager"}
        </Button>
        <Button
          variant="outline"
          disabled
          className="w-full h-[56px] rounded-[32px] bg-[rgba(0,0,0,0.1)] border-0 text-[rgba(0,0,0,0.2)] text-[20px] font-bold cursor-not-allowed"
        >
          Continue as a Fleet Manager
        </Button>
      </div>
    </div>
  );
}