/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors:{
        "navbar":"#00AAFF",
        "mainColor":"#FF6600"
      },
      container:{
        "padding":"2rem"
      }
    },
  },
  plugins: [require("daisyui"),require('flowbite/plugin')],
}