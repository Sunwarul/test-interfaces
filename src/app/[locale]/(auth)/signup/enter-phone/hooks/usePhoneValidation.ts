"use client";

import { useQuery } from "@tanstack/react-query";
import { validatePhone } from "../services/enter-phone.service";

export function usePhoneValidation(phoneNumber: string | null) {
  return useQuery({
    queryKey: ["phone-validation", phoneNumber],
    queryFn: () => validatePhone(phoneNumber!),
    enabled: Boolean(phoneNumber && phoneNumber.length >= 8),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}