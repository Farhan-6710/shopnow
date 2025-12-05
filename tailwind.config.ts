import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Matches all JS, TS, JSX, and TSX files in the pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // Matches all JS, TS, JSX, and TSX files in the components directory
    "./app/**/*.{js,ts,jsx,tsx}", // Matches all JS, TS, JSX, and TSX files in the app directory
    "./src/**/*.{js,ts,jsx,tsx}",
    // Add any additional paths here if you have other directories or files that use Tailwind classes
  ],
  prefix: "",
  theme: {
    extend: {
      spacing: {
        72: "17rem", // Define the custom spacing value (18rem)
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#1f2937",
        secondary: "#ffe533",
        pink: "#f47779",
        primaryLight: "#f3f4f6",
        primaryDark: "#02081e", // Darker shade for dark mode
        primaryDarkTwo: "#111827",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      boxShadow: {
        soft: "0 2px 4px rgba(0, 0, 0, 0.1)", // Soft shadow
        medium: "0 4px 6px rgba(0, 0, 0, 0.1)", // Medium shadow
        intense: "0 0px 13px rgba(0, 0, 0, 0.15)", // Intense shadow
      },
      backdropBlur: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  variants: {
    extend: {
      transitionProperty: ["backgroundColor", "color"], // Add transition support for backgroundColor and color
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
