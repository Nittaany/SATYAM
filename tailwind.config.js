/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#4a90e2',
        'neon-purple': '#a84fe4',
        'neon-pink': '#e44a90',
        'neon-glow': '#4a90e2', // A base color for our glow
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        montserrat: ['var(--font-montserrat)'],
      },
      keyframes: {
        'text-glow': {
          '0%, 100%': { 'text-shadow': '0 0 5px #4a90e2, 0 0 10px #4a90e2, 0 0 15px #a84fe4, 0 0 20px #e44a90' },
          '50%': { 'text-shadow': '0 0 20px #a84fe4, 0 0 25px #e44a90, 0 0 30px #4a90e2, 0 0 35px #a84fe4' },
        },
      },
      animation: {
        'text-glow': 'text-glow 2.5s infinite',
      },
    },
  },
  plugins: [],
};
