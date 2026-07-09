// Config IDs for Get in Touch screen
// From API Guide Step 1 (interface routing)

export const GET_IN_TOUCH_CONFIG = {
    project_id: "68cbaab11eebc9ff240895c6",
    component_id: "69de77f507219f390b0e37df",
    module_id: "69de77f507219f390b0e37f7",
    section_id: "69de77f807219f390b0e384b",
    interface_id: "69de77fa066600e81928af38",
    brand_service_id: "69de77f407219f390b0e37d5",
} as const;

// Tab options mapping to questions enum values
export const FEEDBACK_TABS = [
    { id: "questions", label: "Questions" },
    { id: "ideas", label: "Ideas" },
    { id: "not_happy", label: "Not happy" },
] as const;

export type FeedbackTabId = (typeof FEEDBACK_TABS)[number]["id"];