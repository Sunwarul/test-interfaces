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