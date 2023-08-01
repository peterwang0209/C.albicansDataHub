/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'darkblue': '#003B5C',
      'white': '#FFFFFF',
    },
    extend: {
      fontFamily: {
        splash: ['Ysabeau SC', 'sans-serif'],
        data: ['Helvetica Neue', 'Arial', '"Times New Roman"'],
      }
    },
  },
  plugins: [],
}

