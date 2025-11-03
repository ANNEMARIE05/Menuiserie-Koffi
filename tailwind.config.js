/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'marron': {
          50: '#f5f3f0',
          100: '#e8e3db',
          200: '#d4c9b8',
          300: '#b8a88f',
          400: '#9d8a70',
          500: '#8a7658',
          600: '#6d5d4a',
          700: '#5a4d3f',
          800: '#4d4238',
          900: '#423931',
        },
        'kaki': {
          50: '#f7f6f3',
          100: '#ebe9e0',
          200: '#d6d2c0',
          300: '#b8b297',
          400: '#9d9674',
          500: '#87805f',
          600: '#6d674f',
          700: '#595442',
          800: '#4b4839',
          900: '#403e32',
        },
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'display': ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}

