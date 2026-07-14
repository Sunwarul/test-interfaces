"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { RoleCard } from "./RoleCard";
import { FleetManagerCodeInput } from "./FleetManagerCodeInput";
import { Logo } from "./Logo";
import { useSelectAccountType } from "../hooks/useSelectAccountType";

export function SelectAccountTypePage() {
  const {
    selectedType,
    codeError,
    isValidating,
    isSubmitting,
    handleCodeChange,
    handleContinue,
    handleSelectType,
  } = useSelectAccountType();

  const [fleetManagerCode, setFleetManagerCode] = useState("");

  const onCodeChange = (value: string) => {
    setFleetManagerCode(value);
    handleCodeChange(value);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="absolute left-6 top-[59px] z-10">
        <Logo />
      </div>

      {/* Illustration */}
      <div className="relative h-[380px] -mx-6">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://publiish.io/ipfs/QmWxtzyaxhroZGzmni8mBVaUZ2e6GeH4SLL6Qbw5cFow9u)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-6 -mt-16">
        {/* Select Account Type Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-headline text-black">Select account type:</h2>

          {/* Role Cards */}
          <div className="flex flex-col gap-2">
            <RoleCard
              type="rider"
              isSelected={selectedType === "rider"}
              onSelect={handleSelectType}
            />
            <RoleCard
              type="fleet_manager"
              isSelected={selectedType === "fleet_manager"}
              onSelect={handleSelectType}
            />
          </div>

          {/* Fleet Manager Code Input - shown when Fleet Manager is selected */}
          {selectedType === "fleet_manager" && (
            <div className="mt-4">
              <FleetManagerCodeInput
                value={fleetManagerCode}
                onChange={onCodeChange}
                error={codeError}
                isValidating={isValidating}
              />
            </div>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <div className="px-6 pb-8 pt-4">
        <Button
          onClick={handleContinue}
          disabled={isSubmitting || (selectedType === "fleet_manager" && !!codeError)}
          className="h-14 w-full rounded-full bg-[var(--color-brand-purple)] text-white text-headline hover:bg-[var(--color-brand-purple)]/90 disabled:opacity-50"
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
      </div>
    </div>
  );
}