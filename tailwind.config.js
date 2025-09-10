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
        'gradient': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        'text-glow': 'text-glow 2.5s infinite',
        'gradient': 'gradient 6s linear infinite',
        'scroll': 'scroll 20s linear infinite',
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.purple.400), 0 0 20px theme(colors.purple.600)',
        'neon-hover': '0 0 10px theme(colors.purple.400), 0 0 40px theme(colors.purple.600)',
      },
      backgroundSize: {
        '200%': '200% auto',
      },
    },
  },
  plugins: [],
};
