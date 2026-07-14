import { apiClient } from "@/lib/apiClient";
import type {
  GetRequestBodyResponse,
  ValidateResponse,
} from "../types/select-account-type.types";
import type { SelectAccountTypeConfig } from "../config/select-account-type.config";

export async function getRequestBody(
  config: SelectAccountTypeConfig
): Promise<GetRequestBodyResponse> {
  const { data } = await apiClient.get<GetRequestBodyResponse>(
    "/entities/get-request-body",
    { params: config }
  );

  return data;
}

export async function validateCode(
  config: SelectAccountTypeConfig,
  code: string
): Promise<ValidateResponse> {
  const { data } = await apiClient.post<ValidateResponse>(
    "/entities/validate",
    {
      checks: [
        {
          field: "code",
          value: code,
        },
      ],
      match_mode: "each",
    },
    { params: config }
  );

  return data;
}