/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "navbar":"#00AAFF",
        "mainColor":"#FF6600"
      }
    },
  },
  plugins: [require("daisyui")],
}