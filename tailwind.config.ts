import type { Config } from 'tailwindcss';

export default {
  content: [`./src/pages/**/*.{js,jsx,ts,tsx}`, `./src/components/**/*.{js,jsx,ts,tsx}`],
  theme: {},
  darkMode: 'class',
  plugins: [],
} satisfies Config;