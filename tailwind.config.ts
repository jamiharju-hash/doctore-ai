import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#020617',
          800: '#0F172A',
          700: '#1E293B'
        },
        emerald: {
          500: '#10B981'
        },
        blue: {
          500: '#3B82F6'
        },
        rose: {
          500: '#EF4444'
        }
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace']
      },
      borderWidth: {
        subtle: '1px'
      }
    }
  },
  plugins: []
};

export default config;
