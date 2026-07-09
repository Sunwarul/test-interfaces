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

export interface SignupFormData {
  phoneNumber: string;
  countryCode: string;
  selectCountry: string | null;
}