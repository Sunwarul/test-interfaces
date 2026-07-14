export type AccountType = "rider" | "fleet_manager";

export interface GetRequestBodyResponse {
  success: boolean;
  message: string;
  data?: {
    fields: Record<string, string>;
    enum: Record<string, unknown>;
    datasets: Record<string, unknown>;
  };
}

export interface ValidationCheck {
  field: string;
  value: string | null;
  exists: boolean;
  record_id: string | null;
}

export interface ValidateResponse {
  success: boolean;
  message: string;
  data?: {
    match_mode: "each";
    checks: ValidationCheck[];
  };
}

export interface SelectAccountTypeFormData {
  accountType: AccountType;
  fleetManagerCode: string;
}