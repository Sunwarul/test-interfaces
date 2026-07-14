"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { validatePhoneNumber, createRiderSignup } from "../services/signup-rider.service";
import { SIGNUP_RIDER_CONFIG } from "../config/signup-rider.config";
import type { SignupRiderFormData } from "../types/signup-rider.types";

const signupRiderSchema = z.object({
  phoneNumber: z.string().min(1, "Phone number is required"),
  countryCode: z.string().min(1, "Country code is required"),
  selectCountry: z.string().nullable(),
});

type SignupRiderSchema = z.infer<typeof signupRiderSchema>;

export function useSignupRiderForm() {
  const router = useRouter();
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<SignupRiderFormData>({
    resolver: zodResolver(signupRiderSchema),
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
      return validatePhoneNumber(SIGNUP_RIDER_CONFIG, fullPhone);
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

  const createMutation = useMutation({
    mutationFn: async (phoneNumber: string) => {
      return createRiderSignup(SIGNUP_RIDER_CONFIG, phoneNumber);
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Verification code sent successfully!");
        // Navigate to OTP verification screen
        router.push("/verify-otp");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create account");
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

  const onSubmit = async (data: SignupRiderFormData) => {
    if (phoneError) {
      toast.error("Please fix the phone number error before continuing");
      return;
    }

    const fullPhone = `${data.countryCode}${data.phoneNumber}`;
    createMutation.mutate(fullPhone);
  };

  return {
    form,
    phoneError,
    isValidating,
    isSubmitting: createMutation.isPending,
    handlePhoneChange,
    onSubmit: form.handleSubmit(onSubmit),
  };
}