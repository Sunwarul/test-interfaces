// Config IDs for Reservations List screen
// From API Guide Step 1 (interface routing)
export const RESERVATIONS_ROUTING_CONFIG = {
    project_id: "68bec562008c0eee11657a75",
    design_id: "19280:310649",
} as const;

// From API Guide Step 2 (list records)
export const LIST_RESERVATIONS_CONFIG = {
    project_id: "68bec562008c0eee11657a75",
    interface_id: "699589dc612b0f969a1f7476",
    component_id: "68c07ba8fd692a63c00add48",
    module_id: "699730e0f95ada2d9e0ffbef",
    section_id: "699730e3f95ada2d9e0ffbf3",
    brand_service_id: "697bb7b983ed8855500e83da",
} as const;

// From API Guide Step 1 (read single record)
export const READ_RESERVATIONS_CONFIG = {
    project_id: "68bec562008c0eee11657a75",
    interface_id: "699589dc612b0f969a1f7473",
    component_id: "68c07ba8fd692a63c00add48",
    module_id: "699730e0f95ada2d9e0ffbef",
    section_id: "699730e3f95ada2d9e0ffbf3",
    brand_service_id: "697bb7b883ed8855500e83d8",
} as const;

// Default pagination
export const DEFAULT_PAGE_SIZE = 15;
export const PAGE_SIZE_OPTIONS = [10, 15, 25, 50, 100];