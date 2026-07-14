"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronDown, Loader2 } from "lucide-react";
import type { SignupRiderFormData } from "../types/signup-rider.types";
import type { Country } from "../types/signup-rider.types";
import { useSignupRiderForm } from "../hooks/useSignupRiderForm";

interface SignupRiderFormProps {
  countrySearch: {
    selectedCountry: Country;
    setSelectedCode: (code: string) => void;
  };
  onOpenCountryPicker: () => void;
}

export function SignupRiderForm({
  countrySearch,
  onOpenCountryPicker,
}: SignupRiderFormProps) {
  const { form, phoneError, isValidating, isSubmitting, handlePhoneChange, onSubmit } =
    useSignupRiderForm();
  const { control } = form;

  const selectedCountry = countrySearch.selectedCountry;

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {/* Phone Number Input */}
      <div className="flex flex-col gap-2">
        <label className="text-caption-bold text-black">
          Enter Your Phone Number *
        </label>
        <div className="flex items-center gap-4 h-12 px-0 pr-4 py-0 rounded-3xl border border-[rgba(0,0,0,0.1)] bg-[rgba(255,255,255,0.1)]">
          {/* Country Code Selector */}
          <button
            type="button"
            onClick={onOpenCountryPicker}
            className="flex items-center gap-2 h-full px-3 bg-[rgba(0,0,0,0.05)] rounded-3xl shrink-0"
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-body-normal text-black">
              {selectedCountry.dialCode}
            </span>
            <ChevronDown className="size-5 text-black/60" />
          </button>

          {/* Phone Input */}
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="tel"
                placeholder="Phone Number"
                className="flex-1 border-0 shadow-none focus-visible:ring-0 px-0 h-full text-body-normal"
                onChange={(e) => {
                  field.onChange(e);
                  handlePhoneChange(e.target.value);
                }}
              />
            )}
          />
        </div>

        {/* Error Message */}
        {phoneError && (
          <div className="flex items-center gap-1 text-[#fc5959] text-caption-normal">
            <AlertCircle className="size-4" />
            <span>{phoneError}</span>
          </div>
        )}

        {/* Validation Indicator */}
        {isValidating && (
          <div className="flex items-center gap-1 text-[rgba(0,0,0,0.4)] text-caption-normal">
            <Loader2 className="size-4 animate-spin" />
            <span>Validating...</span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="h-14 rounded-full bg-[var(--color-brand-purple)] text-white text-headline hover:bg-[var(--color-brand-purple)]/90 disabled:opacity-50"
        disabled={!!phoneError || isValidating || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-5 animate-spin mr-2" />
            Processing...
          </>
        ) : (
          "Continue as a Rider"
        )}
      </Button>
    </form>
  );
}