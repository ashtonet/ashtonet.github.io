/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#030712',
        primary: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
        },
        accent: {
          blue: '#60a5fa',
          purple: '#8b5cf6'
        }
      },
      backdropBlur: {
        xs: '4px'
      }
    }
  },
  plugins: []
}
