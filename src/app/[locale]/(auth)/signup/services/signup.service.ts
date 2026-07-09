import { apiClient } from "@/lib/apiClient";
import type { PhoneValidationResponse } from "../types/signup.types";
import type { Config } from "./types";

export async function validatePhoneNumber(
  config: Config,
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

export async function getSignupRequestBody(config: Config) {
  const { data } = await apiClient.get("/entities/get-request-body", {
    params: config,
  });

  return data;
}