import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f0fe',
          100: '#d2e1fc',
          200: '#a6c4f7',
          300: '#7aa7f2',
          400: '#4e8aed',
          500: '#226de8',
          600: '#1b56ba',
          700: '#14408c',
          800: '#0d2b5e',
          900: '#061530',
        },
      },
    },
  },
  plugins: [],
}
export default config
