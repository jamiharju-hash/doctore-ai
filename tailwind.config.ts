import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#020617", // Syvä tausta
          800: "#0F172A", // Kortit/Pinnat
          700: "#1E293B", // Borderit
          600: "#334155", // Hoverit / korostukset
        },
        emerald: {
          500: "#10B981", // Edge / EV+
        },
        blue: {
          500: "#3B82F6", // Mallin data
        },
        rose: {
          500: "#EF4444", // Riski / EV-
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
