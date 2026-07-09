// @ts-nocheck
/**
 * Typed API Client for making HTTP requests
 * Supports GET and POST methods with query parameters
 */

import { env } from "@/config/env";

interface ApiClientOptions {
  params?: Record<string, string | number | boolean>;
  headers?: Record<string, string>;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  cached?: boolean;
  execution_time?: number;
  current_page?: number;
  items_per_page?: number;
  total?: number;
  page_items?: number;
  last_page?: number;
}

/**
 * Build URL with query parameters
 */
function buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
  const url = new URL(`${env.apiBaseUrl}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
}

/**
 * GET request helper
 */
export async function apiGet<T>(
  endpoint: string,
  options?: ApiClientOptions
): Promise<ApiResponse<T>> {
  const url = buildUrl(endpoint, options?.params);
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API GET Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

/**
 * POST request helper
 */
export async function apiPost<T>(
  endpoint: string,
  body: unknown,
  options?: ApiClientOptions
): Promise<ApiResponse<T>> {
  const url = buildUrl(endpoint, options?.params);
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API POST Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

export type { ApiClientOptions, ApiResponse };
