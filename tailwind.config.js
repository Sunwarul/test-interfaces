/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Bootstrap fallback tokens only.
      // During Figma generation, replace these values with the exact colors
      // extracted from the current Figma frame before writing screen code.
      colors: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        "surface-muted": "#F1F5F9",
        primary: "#6054ba",
        "primary-foreground": "#FFFFFF",
        "text-primary": "#000000",
        "text-secondary": "rgba(0,0,0,0.6)",
        "text-muted": "rgba(0,0,0,0.4)",
        border: "rgba(0,0,0,0.1)",
        "border-focus": "rgba(0,0,0,0.2)",
        error: "#fc5959",
        success: "#16A34A",
        warning: "#D97706",
        "brand-purple": "#6054ba",
        "bg-black-5": "rgba(0,0,0,0.05)",
        "bg-black-10": "rgba(0,0,0,0.1)",
        "text-black-20": "rgba(0,0,0,0.2)",
        "rating-yellow": "#f8cb19",
      },
      borderRadius: {
        card: "8px",
        "input": "24px",
        "button": "32px",
      },
      spacing: {
        screen: "24px",
        card: "16px",
      },
    },
  },
  plugins: [],
};