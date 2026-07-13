import { apiClient } from "@/lib/apiClient";
import {
  ENTER_PHONE_CONFIG,
  ENTER_PHONE_VALIDATE_CONFIG,
} from "../config/enter-phone.config";
import type {
  GetRequestBodyResponse,
  PhoneValidationResponse,
} from "../types/enter-phone.types";

export async function getRequestBody() {
  const { data } = await apiClient.get<GetRequestBodyResponse>(
    "/entities/get-request-body",
    {
      params: ENTER_PHONE_CONFIG,
    }
  );
  return data;
}

export async function validatePhone(phoneNumber: string) {
  const { data } = await apiClient.post<PhoneValidationResponse>(
    "/entities/validate",
    {
      checks: [
        {
          field: "phoneNumber",
          value: phoneNumber,
        },
      ],
      match_mode: "each",
    },
    {
      params: ENTER_PHONE_VALIDATE_CONFIG,
    }
  );
  return data;
}