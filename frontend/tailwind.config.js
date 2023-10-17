/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkblue: "#003B5C",
        white: "#FFFFFF",
        lightgrey: "#f8f8f8",
      },
      fontFamily: {
        splash: ["Ysabeau SC", "sans-serif"],
        data: ["Helvetica Neue", "Arial", '"Times New Roman"'],
      },
    },
  },
  plugins: [],
};
