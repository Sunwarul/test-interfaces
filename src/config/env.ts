const defaultApiBaseUrl = "https://backend-automation-dev.automatedpros.link/api/v2.0.0";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? defaultApiBaseUrl).replace(/\/+$/, "");

export const env = {
  apiBaseUrl,
} as const;
