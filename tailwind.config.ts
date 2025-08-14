import type { Config } from 'tailwindcss';

// Tailwind 設定（ダークモードはclass切替）
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './styles/**/*.{css}',
    './content/**/*.{mdx,md}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb'
        }
      }
    }
  },
  plugins: []
} satisfies Config;

