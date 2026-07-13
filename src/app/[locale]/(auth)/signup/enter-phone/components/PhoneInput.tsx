"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, AlertCircle } from "lucide-react";
import { CountrySelector } from "./CountrySelector";
import type { Country } from "../types/enter-phone.types";
import { cn } from "@/lib/utils";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  country: Country | null;
  onCountryChange: (country: Country) => void;
  error?: string;
  placeholder?: string;
  className?: string;
}

export function PhoneInput({
  value,
  onChange,
  country,
  onCountryChange,
  error,
  placeholder = "Phone Number",
  className,
}: PhoneInputProps) {
  const [countrySelectorOpen, setCountrySelectorOpen] = useState(false);

  const handleCountrySelect = (selectedCountry: Country) => {
    onCountryChange(selectedCountry);
  };

  return (
    <>
      <div className={cn("flex flex-col gap-2", className)}>
        <label className="text-[13px] font-bold text-black px-4">
          Enter Your Phone Number *
        </label>

        <div
          className={cn(
            "flex items-center h-[48px] rounded-[24px] border border-[rgba(0,0,0,0.1)] bg-white overflow-hidden",
            error && "border-[var(--color-destructive,#dc2626)]"
          )}
        >
          {/* Country Code Picker */}
          <button
            type="button"
            onClick={() => setCountrySelectorOpen(true)}
            className="flex items-center gap-2 h-full px-2 bg-[rgba(0,0,0,0.05)] rounded-l-[24px] hover:bg-[rgba(0,0,0,0.08)] transition-colors"
          >
            <span className="text-[32px] leading-none">
              {country?.flag || "🇮🇳"}
            </span>
            <span className="text-[16px] font-medium">
              {country?.dialCode || "+91"}
            </span>
            <ChevronDown className="w-6 h-6 text-black/60" />
          </button>

          {/* Phone Input */}
          <Input
            type="tel"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 h-full border-0 rounded-none shadow-none focus-visible:ring-0 px-4 text-[16px]"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-1 px-4 text-[13px] text-[#fc5959]">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <CountrySelector
        open={countrySelectorOpen}
        onOpenChange={setCountrySelectorOpen}
        selectedCountry={country}
        onSelect={handleCountrySelect}
      />
    </>
  );
}