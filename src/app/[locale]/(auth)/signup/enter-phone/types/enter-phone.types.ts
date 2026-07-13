export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export interface PhoneValidationCheck {
  field: string;
  value: string;
  exists: boolean;
  record_id: string | null;
}

export interface PhoneValidationResponse {
  success: boolean;
  message: string;
  data?: {
    match_mode: "each";
    checks: PhoneValidationCheck[];
  };
}

export interface GetRequestBodyResponse {
  success: boolean;
  message: string;
  data?: {
    fields: Record<string, string>;
    enum: Record<string, unknown>;
    datasets: Record<string, unknown>;
  };
}

export interface EnterPhoneFormData {
  phoneNumber: string;
  countryCode: string;
  countryName: string;
}