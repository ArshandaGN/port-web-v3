/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable dark mode based on the 'class' present on the HTML element
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Define Poppins as the primary font
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        // Define custom colors for light and dark themes
        // Dark Mode Palette
        'primary-dark': '#081b29', // Main background dark
        'secondary-dark': '#1e2a38', // Card/secondary background dark
        'text-dark': '#ededed', // Main text light
        'text-secondary-dark': '#a0a0a0', // Secondary text light
        'accent-dark': '#00abf0', // Accent color

        // Light Mode Palette
        'primary-light': '#f3f3f3', // Main background light
        'secondary-light': '#ffffff', // Card/secondary background light
        'text-light': '#081b29', // Main text dark
        'text-secondary-light': '#555555', // Secondary text dark
        'accent-light': '#00abf0', // Accent color (same for consistency)
      },
    },
  },
  plugins: [],
}

