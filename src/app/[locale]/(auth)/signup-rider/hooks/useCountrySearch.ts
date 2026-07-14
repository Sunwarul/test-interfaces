"use client";

import { useState, useMemo } from "react";
import type { Country } from "../types/signup-rider.types";

const COUNTRIES: Country[] = [
  { code: "AF", name: "Afghanistan", dialCode: "+93", flag: "🇦🇫" },
  { code: "AL", name: "Albania", dialCode: "+355", flag: "🇦🇱" },
  { code: "DZ", name: "Algeria", dialCode: "+213", flag: "🇩🇿" },
  { code: "AD", name: "Andorra", dialCode: "+376", flag: "🇦🇩" },
  { code: "AO", name: "Angola", dialCode: "+244", flag: "🇦🇴" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "AM", name: "Armenia", dialCode: "+374", flag: "🇦🇲" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "AZ", name: "Azerbaijan", dialCode: "+994", flag: "🇦🇿" },
  { code: "BS", name: "Bahamas", dialCode: "+1-246", flag: "🇧🇸" },
  { code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭" },
  { code: "BD", name: "Bangladesh", dialCode: "+375", flag: "🇧🇩" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
];

export function useCountrySearch() {
  const [search, setSearch] = useState("");
  const [selectedCode, setSelectedCode] = useState("IN");

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return COUNTRIES;
    const query = search.toLowerCase();
    return COUNTRIES.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.dialCode.includes(query)
    );
  }, [search]);

  const selectedCountry = useMemo(
    () => COUNTRIES.find((c) => c.code === selectedCode) ?? COUNTRIES[0],
    [selectedCode]
  );

  return {
    search,
    setSearch,
    filteredCountries,
    selectedCountry,
    selectedCode,
    setSelectedCode,
  };
}