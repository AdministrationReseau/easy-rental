import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/Dashboard/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          '0%': { top: '0' },
          '100%': { top: '-100px' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        slideDown: 'slideDown 0.6s ease-out forwards',
        fadeIn: 'fadeIn 1s ease-in-out forwards',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1240px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-blue': '#005FFE',
        'secondary-blue': '#54A6FF',
        'whitish-background': '#F6F7F9',
        'primary-text': '#083A50',
        'secondary-text': '#90A3BF',
        'blue-text': '#1BA0E2',
        'green-text': '#0EAD69',
        'orange-text': '#F49A47',
        'red-text': '#FF5D47',
        'blue-background': '#dcfbff',
        'green-background': '#DCFAED',
        'orange-background': '#FFE5A1',
        'red-background': '#FDE2E2',
        'toogle-yellow': '#EFBB3B',
        'toggle-yellow-background': '#F2E2AB',
        'toggle-blue': '#1BA0E2',
        'toggle-blue-background': '#092D3E',
        'tahiti': {
          DEFAULT: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
      }
    },
  },
  plugins: [],
} satisfies Config;
