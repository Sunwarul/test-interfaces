export const colors = {
  // Bootstrap fallback tokens only.
  // During Figma generation, replace these values with the exact colors
  // extracted from the current Figma frame before writing screen code.
  background: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceMuted: "#F1F5F9",
  primary: "#6054ba",
  primaryForeground: "#FFFFFF",
  textPrimary: "#000000",
  textSecondary: "rgba(0,0,0,0.6)",
  textMuted: "rgba(0,0,0,0.4)",
  border: "rgba(0,0,0,0.1)",
  borderFocus: "rgba(0,0,0,0.2)",
  error: "#fc5959",
  success: "#16A34A",
  warning: "#D97706",
  brandPurple: "#6054ba",
  bgBlack5: "rgba(0,0,0,0.05)",
  bgBlack10: "rgba(0,0,0,0.1)",
  textBlack20: "rgba(0,0,0,0.2)",
} as const;

export type ColorName = keyof typeof colors;
