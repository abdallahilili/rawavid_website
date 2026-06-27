/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#18216d',
          dark: '#0f1550',
          light: '#eef0fa',
          mid: '#2e3b99',
        },
        accent: {
          DEFAULT: '#FF825C',
          dark: '#e06040',
          light: '#fff0eb',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 40px rgba(23, 31, 114, 0.12)',
        'card-hover': '0 20px 60px rgba(23, 31, 114, 0.2)',
        'accent': '0 16px 30px rgba(255, 130, 92, 0.35)',
        'primary': '0 16px 30px rgba(23, 31, 114, 0.25)',
      },
    },
  },
  plugins: [],
}
