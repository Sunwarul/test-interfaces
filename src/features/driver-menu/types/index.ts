import { z } from "zod";

// Driver profile schema
export const driverProfileSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  avatar: z.string().url().optional(),
  rating: z.number().optional(),
  reviewCount: z.number().optional(),
});

export type DriverProfile = z.infer<typeof driverProfileSchema>;

// API response types
export interface DriverMenuApiResponse {
  success: boolean;
  message: string;
  data: {
    main: {
      id: string;
      name?: string;
      avatar?: string;
      rating?: number;
      reviewCount?: number;
    };
    datasets: Record<string, unknown>;
    enum: Record<string, unknown>;
  };
}

// Clone service types
export interface CloneRequestParams {
  component_id: string;
  module_id: string;
  section_id: string;
  interface_id: string;
  brand_service_id: string;
  project_id: string;
}

export interface CloneResult {
  id: string;
  endpoint_id: string;
  table_name: string;
}

export interface CloneResponse {
  success: boolean;
  message: string;
  data: {
    main: CloneResult;
    related: Record<string, unknown>;
  };
  meta: {
    default_values: Record<string, unknown>;
    session_values: Record<string, unknown>;
  };
  execution_time: number;
  timestamp: string;
}

// Menu item types
export interface MainMenuItem {
  id: string;
  label: string;
  icon?: string;
  onPress?: () => void;
}

export interface SmallMenuItem {
  id: string;
  label: string;
  icon: 'users' | 'globe' | 'headphones' | 'message';
  onPress?: () => void;
}