"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { validateCode } from "../services/select-account-type.service";
import { SELECT_ACCOUNT_TYPE_CONFIG } from "../config/select-account-type.config";
import type { AccountType } from "../types/select-account-type.types";

export function useSelectAccountType() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<AccountType>("rider");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const validateMutation = useMutation({
    mutationFn: async (code: string) => {
      return validateCode(SELECT_ACCOUNT_TYPE_CONFIG, code);
    },
    onSuccess: (data) => {
      if (data.success && data.data?.checks?.[0]) {
        const check = data.data.checks[0];
        if (!check.exists) {
          setCodeError("Please enter a valid code");
        } else {
          setCodeError(null);
        }
      }
    },
    onError: () => {
      setCodeError(null);
    },
  });

  const handleCodeChange = useCallback(
    (value: string) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      if (value.length === 0) {
        setCodeError(null);
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

  const handleContinue = useCallback(() => {
    if (selectedType === "rider") {
      router.push("/signup-rider");
    } else {
      // Fleet Manager - validate code if provided
      const code = document.querySelector<HTMLInputElement>('input[name="fleetManagerCode"]')?.value;
      if (code && codeError) {
        toast.error("Please enter a valid code");
        return;
      }
      router.push("/signup");
    }
  }, [selectedType, codeError, router]);

  const handleSelectType = useCallback((type: AccountType) => {
    setSelectedType(type);
  }, []);

  return {
    selectedType,
    codeError,
    isValidating,
    isSubmitting: false,
    handleCodeChange,
    handleContinue,
    handleSelectType,
  };
}