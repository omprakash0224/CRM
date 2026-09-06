import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
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
        // Slacc Brand Colors from DESIGN.md
        aubergine: {
          DEFAULT: "#4a154b",
          deep: "#481a54",
          press: "#611f69",
          tint: "#592466",
        },
        canvas: {
          DEFAULT: "#ffffff",
          cream: "#f4ede4",
          lavender: "#f9f0ff",
        },
        hairline: "#e6e6e6",
        ink: {
          DEFAULT: "#1d1d1d",
          mute: "#696969",
        },
        on: {
          primary: "#ffffff",
          "aubergine-mute": "#d9bdde",
        },
        link: {
          blue: "#1264a3",
          hover: "#3860be",
        },
        semantic: {
          error: "#cc4117",
          success: "#007a5a",
        },
      },
      borderRadius: {
        pill: "90px",
        xxl: "48px",
        xl: "16px",
        lg: "12px",
        md: "8px",
        sm: "4px",
        xs: "2px",
      },
      boxShadow: {
        "elevation-1": "0 5px 20px 0 rgba(0, 0, 0, 0.08)",
        "elevation-2": "0 0 32px 0 rgba(0, 0, 0, 0.08)",
        "elevation-3": "0 1px 10px 0 rgba(0, 0, 0, 0.15)",
        "aubergine-inset": "inset 0 0 0 1px rgb(97, 31, 105)",
      },
      letterSpacing: {
        "tight-display-xxl": "-0.768px",
        "tight-display-xl": "-0.464px",
        "tight-display-lg": "-0.6px",
        "tight-display-md": "-0.256px",
        "micro-cap": "0.96px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        heading: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
