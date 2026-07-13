"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCountrySearch } from "../hooks/useCountrySearch";
import type { Country } from "../types/enter-phone.types";
import { cn } from "@/lib/utils";
import { ChevronLeft, Search } from "lucide-react";

interface CountrySelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCountry: Country | null;
  onSelect: (country: Country) => void;
}

export function CountrySelector({
  open,
  onOpenChange,
  selectedCountry,
  onSelect,
}: CountrySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const countries = useCountrySearch(searchQuery);

  const handleSelect = (country: Country) => {
    onSelect(country);
    onOpenChange(false);
    setSearchQuery("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-w-[414px] max-h-[85vh] overflow-hidden rounded-bl-[40px] rounded-br-[40px] rounded-tl-[40px] rounded-tr-[40px]">
        {/* Header */}
        <div className="flex items-center gap-6 px-2 pr-6 pt-[59px] pb-4">
          <button
            onClick={() => onOpenChange(false)}
            className="w-[56px] h-[56px] rounded-[32px] flex items-center justify-center p-[8px] hover:bg-[rgba(0,0,0,0.05)] transition-colors"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="flex-1 text-[24px] font-bold tracking-[-0.48px]">
            Select Country
          </h2>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[rgba(0,0,0,0.4)]" />
            <Input
              type="text"
              placeholder="Search country"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[40px] rounded-[24px] bg-[rgba(0,0,0,0.05)] pl-12 pr-4 border-0 focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Country List */}
        <ScrollArea className="h-[calc(85vh-180px)]">
          <div className="flex flex-col">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleSelect(country)}
                className={cn(
                  "flex items-center gap-6 h-[60px] px-6 border-b border-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.02)] transition-colors",
                  selectedCountry?.code === country.code && "bg-[rgba(96,84,186,0.1)]"
                )}
              >
                <span className="text-[32px] leading-none">{country.flag}</span>
                <div className="flex-1 flex items-center gap-2">
                  <span className="font-medium text-[16px]">{country.name}</span>
                  <span className="text-[rgba(0,0,0,0.6)] text-[16px]">
                    {country.dialCode}
                  </span>
                </div>
                {selectedCountry?.code === country.code && (
                  <div className="w-6 h-6 rounded-full bg-[var(--color-brand-purple,#6054ba)] flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}