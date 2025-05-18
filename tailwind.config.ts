import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        pixel: ["var(--font-pixel)", "VT323", "monospace"],
      },
      colors: {
        // Retro color palette
        retro: {
          black: "#000000",
          darkGray: "#333333",
          gray: "#666666",
          lightGray: "#999999",
          white: "#FFFFFF",
          red: "#FF0000",
          orange: "#FF7F00",
          yellow: "#FFFF00",
          green: "#00FF00",
          blue: "#0000FF",
          purple: "#7F00FF",
          pink: "#FF00FF",
        },
        // MacBook window colors
        window: {
          title: "#C0C0C0",
          close: "#FF5F57",
          minimize: "#FFBD2E",
          maximize: "#28C940",
        },
        // Original theme colors preserved for compatibility
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pixel: "0", // For pixel-perfect corners
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'pixel-sm': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
        'pixel-lg': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
      },
      keyframes: {
        'twinkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        'pulse-slow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pixel-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        "pixel-pulse": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        "pixel-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
        },
        'ping-once': {
          '0%, 20%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pixel-bounce": "pixel-bounce 1s ease-in-out infinite",
        "pixel-pulse": "pixel-pulse 2s ease-in-out infinite",
        "pixel-shake": "pixel-shake 0.2s ease-in-out",
        'twinkle': 'twinkle 3s infinite ease-in-out',
        'pulse-slow': 'pulse-slow 2.5s infinite ease-in-out',
        'ping-once': 'ping-once 1.5s ease-out',
      },
    },
    safelist: [
    // Example theme classes
    'font-mono', 'bg-black', 'text-green-400',
    'font-pixel', 'bg-slate-100', 'text-slate-800',
    'bg-rose-50', 'text-rose-800',
    'bg-blue-900', 'text-blue-200',
    ],
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
