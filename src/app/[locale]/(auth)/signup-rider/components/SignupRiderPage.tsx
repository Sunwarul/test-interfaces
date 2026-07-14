"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { SignupRiderForm } from "./SignupRiderForm";
import { CountryPicker } from "../../signup/components/CountryPicker";
import { SocialLoginButtons } from "../../signup/components/SocialLoginButtons";
import { useCountrySearch } from "../hooks/useCountrySearch";
import { RiderAvatar } from "./RiderAvatar";

export function SignupRiderPage() {
  const router = useRouter();
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const countrySearch = useCountrySearch();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Page Header */}
      <div className="flex items-center justify-between px-4 pt-[59px] pb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full size-14"
            onClick={() => router.back()}
          >
            <ChevronLeft className="size-6" />
          </Button>
          <h1 className="text-title-3">Rider</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative flex justify-center py-8">
        <div className="absolute -translate-x-1/2 left-1/2 top-0">
          <RiderAvatar />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col gap-10 px-6">
        <SignupRiderForm
          countrySearch={countrySearch}
          onOpenCountryPicker={() => setShowCountryPicker(true)}
        />

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[rgba(0,0,0,0.1)]" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-[rgba(0,0,0,0.4)] text-body-normal">
              or
            </span>
          </div>
        </div>

        {/* Social Login */}
        <SocialLoginButtons />
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 pt-4 text-center">
        <p className="text-caption-normal text-[rgba(0,0,0,0.6)]">
          We're committed to your privacy. By Signing Up you agree to our{" "}
          <a href="#" className="text-black underline font-medium">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-black underline font-medium">
            Terms and Conditions
          </a>
        </p>
      </div>

      {/* Country Picker Modal */}
      <CountryPicker
        open={showCountryPicker}
        onOpenChange={setShowCountryPicker}
        countrySearch={countrySearch}
      />
    </div>
  );
}