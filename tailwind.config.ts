import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#020617", // Syvä tausta
          800: "#0F172A", // Kortit/Pinnat
          700: "#1E293B", // Borderit
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
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
