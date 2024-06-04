/** @type {import('tailwindcss').Config} */
export default {
  content: ['./main.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#874CCC',
        mid: '#C65BCF',
        light: '#F27BBD',
        back: '#fbfafc',
      },
    },
  },
  plugins: [],
};
