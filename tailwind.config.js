/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Dark mode
        'primary-dark': '#081b29',
        'secondary-dark': '#1e2a38',
        'text-dark': '#ededed',
        'text-secondary-dark': '#a0a0a0',
        'accent-dark': '#00abf0',

        // Light mode
        'primary-light': '#f3f3f3',
        'secondary-light': '#ffffff',
        'text-light': '#081b29',
        'text-secondary-light': '#555555',
        'accent-light': '#00abf0',
      },
      animation: {
        gradient: 'gradientBG 10s ease infinite',
      },
      keyframes: {
        gradientBG: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
