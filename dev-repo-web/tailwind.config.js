/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#27dec0',
        'secondary':'#36474F',
      },
    }
  },
  plugins: [],
}
