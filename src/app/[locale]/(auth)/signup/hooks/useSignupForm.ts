"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { validatePhoneNumber } from "../services/signup.service";
import { SIGNUP_CONFIG } from "../config/signup.config";
import type { SignupFormData } from "../types/signup.types";

const signupSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  countryCode: z.string().min(1, "Country code is required"),
  selectCountry: z.string().nullable(),
});

type SignupSchema = z.infer<typeof signupSchema>;

export function useSignupForm() {
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      phoneNumber: "",
      countryCode: "+91",
      selectCountry: null,
    },
    mode: "onTouched",
  });

  const validateMutation = useMutation({
    mutationFn: async (phone: string) => {
      const fullPhone = `${form.getValues("countryCode")}${phone}`;
      return validatePhoneNumber(SIGNUP_CONFIG, fullPhone);
    },
    onSuccess: (data) => {
      if (data.success && data.data?.checks?.[0]) {
        const check = data.data.checks[0];
        if (check.exists) {
          setPhoneError("This phone number is already registered");
        } else {
          setPhoneError(null);
        }
      }
    },
    onError: () => {
      setPhoneError(null);
    },
  });

  const handlePhoneChange = useCallback(
    (value: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (value.length < 3) {
        setPhoneError(null);
        return;
      }

      debounceRef.current = setTimeout(() => {
        setIsValidating(true);
        validateMutation.mutate(value, {
          onSettled: () => setIsValidating(false),
        });
      }, 500);
    },
    [validateMutation]
  );

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const onSubmit = async (data: SignupFormData) => {
    if (phoneError) {
      toast.error("Please fix the phone number error before continuing");
      return;
    }

    const fullPhone = `${data.countryCode}${data.phoneNumber}`;
    toast.success(`Proceeding with: ${fullPhone}`);
    // TODO: Navigate to OTP verification
  };

  return {
    form,
    phoneError,
    isValidating,
    isSubmitting: validateMutation.isPending,
    handlePhoneChange,
    onSubmit: form.handleSubmit(onSubmit),
  };
}