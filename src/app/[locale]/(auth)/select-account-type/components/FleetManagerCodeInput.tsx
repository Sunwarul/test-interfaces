"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FleetManagerCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
  isValidating: boolean;
  placeholder?: string;
}

export function FleetManagerCodeInput({
  value,
  onChange,
  error,
  isValidating,
  placeholder = "Enter Code Here",
}: FleetManagerCodeInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-caption-bold text-black">
        Fleet Manager Code{" "}
        <span className="font-normal text-[rgba(0,0,0,0.6)]">(Optional)</span>
      </label>

      <div
        className={`
          relative
          ${error ? "[&_input]:border-[#fc5959] [&_input]:text-[#fc5959]" : ""}
        `}
      >
        <Input
          type="text"
          name="fleetManagerCode"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            h-12 px-4 py-3 rounded-3xl 
            bg-[rgba(255,255,255,0.1)] border-[rgba(0,0,0,0.1)]
            text-body-normal
            placeholder:text-[rgba(0,0,0,0.4)]
            ${error ? "border-[#fc5959] text-[#fc5959]" : "text-black"}
          `}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-1 text-[#fc5959] text-caption-normal">
          <AlertCircle className="size-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Validating indicator */}
      {isValidating && (
        <div className="flex items-center gap-1 text-[rgba(0,0,0,0.4)] text-caption-normal">
          <Loader2 className="size-4 animate-spin" />
          <span>Validating...</span>
        </div>
      )}
    </div>
  );
}