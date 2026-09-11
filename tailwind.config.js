/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0f1d',
        foreground: '#f8fafc',
        card: '#111827',
        border: '#1f293d',
        primary: {
          DEFAULT: '#0ea5e9',
          foreground: '#ffffff',
        },
      },
    },
  },
  plugins: [],
}
