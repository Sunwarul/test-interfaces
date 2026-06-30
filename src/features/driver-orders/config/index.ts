// API mapping IDs for Driver Orders feature
export const DRIVER_ORDERS_CONFIG = {
  componentId: "69de77f507219f390b0e37df",
  moduleId: "69de77f507219f390b0e37f7",
  sectionId: "69de77f507219f390b0e37f8",
  interfaceId: "6a23efb0fce183e19b5f69df",
  brandServiceId: "69de77f407219f390b0e37d6",
  projectId: "68cbaab11eebc9ff240895c6",
} as const;

// Query key constants
export const DRIVER_ORDERS_QUERY_KEYS = {
  list: (orgId?: string) =>
    orgId
      ? ["org", orgId, "driver-orders", "list"] as const
      : ["driver-orders", "list"] as const,
  detail: (id: string) => ["driver-orders", "detail", id] as const,
  earnings: (period: string) => ["driver-orders", "earnings", period] as const,
} as const;

// Time period options
export const TIME_PERIODS = ["Today", "Weekly", "Monthly", "Yearly"] as const;
export type TimePeriod = (typeof TIME_PERIODS)[number];