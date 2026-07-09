"use client";

import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, Check } from "lucide-react";
import type { Country } from "../types/signup.types";

interface CountryPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  countrySearch: {
    search: string;
    setSearch: (search: string) => void;
    filteredCountries: Country[];
    selectedCode: string;
    setSelectedCode: (code: string) => void;
  };
}

export function CountryPicker({
  open,
  onOpenChange,
  countrySearch,
}: CountryPickerProps) {
  const { search, setSearch, filteredCountries, selectedCode, setSelectedCode } =
    countrySearch;

  const handleSelect = (country: Country) => {
    setSelectedCode(country.code);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 max-h-[85vh] overflow-hidden rounded-b-[40px]">
        <DialogHeader className="sticky top-0 bg-white z-10 px-4 pt-[59px] pb-4 border-b">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full size-14"
              onClick={() => onOpenChange(false)}
            >
              <ChevronLeft className="size-6" />
            </Button>
            <DialogTitle className="text-title-3">Select Country</DialogTitle>
          </div>
        </DialogHeader>

        {/* Search Input */}
        <div className="px-4 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-[rgba(0,0,0,0.4)]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country"
              className="pl-12 h-10 rounded-3xl bg-[rgba(0,0,0,0.05)] border-0"
            />
          </div>
        </div>

        {/* Country List */}
        <div className="overflow-y-auto max-h-[calc(85vh-200px)]">
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              onClick={() => handleSelect(country)}
              className="w-full flex items-center gap-4 px-6 py-4 border-b border-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.02)] transition-colors"
            >
              <span className="text-2xl">{country.flag}</span>
              <div className="flex-1 text-left">
                <span className="text-body-bold text-black">{country.name}</span>
                <span className="text-body-normal text-[rgba(0,0,0,0.6)] ml-2">
                  ({country.dialCode})
                </span>
              </div>
              {selectedCode === country.code && (
                <Check className="size-5 text-[var(--color-brand-purple)]" />
              )}
            </button>
          ))}

          {filteredCountries.length === 0 && (
            <div className="px-6 py-8 text-center text-[rgba(0,0,0,0.4)]">
              No countries found
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}