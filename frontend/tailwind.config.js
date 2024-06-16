/** @type {import('tailwindcss').Config} */
export default {
  content: ['./main.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#000000',
        mid: '#179600',
        light: '#F27BBD',
        back: '#ffffff',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
