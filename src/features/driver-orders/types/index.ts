import { z } from "zod";

// Order address schema
export const OrderAddressSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  type: z.enum(["pickup", "dropoff"]),
});

export type OrderAddress = z.infer<typeof OrderAddressSchema>;

// Order item schema
export const OrderItemSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  itemCount: z.number(),
  price: z.number(),
  pickupTime: z.string(),
  dropoffTime: z.string(),
  pickupAddress: OrderAddressSchema,
  dropoffAddress: OrderAddressSchema,
  status: z.string(),
});

export type OrderItem = z.infer<typeof OrderItemSchema>;

// Earnings data schema
export const EarningsDataSchema = z.object({
  totalAmount: z.number(),
  orderCount: z.number(),
  period: z.string(),
  chartData: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
      isHighlighted: z.boolean().optional(),
    })
  ),
});

export type EarningsData = z.infer<typeof EarningsDataSchema>;

// API response schema
export const DriverOrdersResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    main: z.object({
      id: z.string(),
    }),
    datasets: z.record(z.string(), z.unknown()).optional(),
    enum: z.record(z.string(), z.unknown()).optional(),
  }),
});

export type DriverOrdersResponse = z.infer<typeof DriverOrdersResponseSchema>;

// Form values for date range picker
export interface DateRangeFormValues {
  startDate: Date;
  endDate: Date;
}

// Search filter values
export interface OrderFilters {
  searchQuery: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  period: "Today" | "Weekly" | "Monthly" | "Yearly";
}