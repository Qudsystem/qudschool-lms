/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        border: 'var(--color-border)',
        'card-background': 'var(--color-card-background)',
      },
      boxShadow: {
        card: 'var(--color-card-shadow)',
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
}
