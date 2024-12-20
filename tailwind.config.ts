import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-blue': '#005FFE',
          'secondary-blue': '#54A6FF',
        'whitish-background': '#F6F7F9',
        'primary-text': '#083A50',
        'secondary-text': '#90A3BF',
        'green-text': '#0EAD69',
        'orange-text': '#F49A47',
        'red-text': '#FF5D47',
        'green-background': '#DCFAED',
        'orange-background': '#FFE5A1',
        'red-background': '#FDE2E2',
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
