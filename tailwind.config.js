/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyan: {
          50: '#E0F7FA',
          100: '#B2EBF2',
          400: '#4DD0E1',
          600: '#00ACC1',
          700: '#00838F',
          900: '#006064',
        },
        coral: {
          400: '#FF8A80',
          500: '#FF6F61',
          600: '#F4511E',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};