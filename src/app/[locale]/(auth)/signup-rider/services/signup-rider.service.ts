import { apiClient } from "@/lib/apiClient";
import type {
  PhoneValidationResponse,
  CreateRiderResponse,
} from "../types/signup-rider.types";
import type { SignupRiderConfig } from "../config/signup-rider.config";

export async function validatePhoneNumber(
  config: SignupRiderConfig,
  phoneNumber: string
): Promise<PhoneValidationResponse> {
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
    { params: config }
  );

  return data;
}

export async function createRiderSignup(
  config: SignupRiderConfig,
  phoneNumber: string
): Promise<CreateRiderResponse> {
  const { data } = await apiClient.post<CreateRiderResponse>(
    "/entities/create",
    {
      data: {
        enterYourPhoneNumber: phoneNumber,
      },
    },
    { params: config }
  );

  return data;
}