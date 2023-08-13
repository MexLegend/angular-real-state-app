/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'prodigysans': ['Prodigysans', 'sans-serif'],
        'mayennesans': ['Mayennesans', 'sans-serif']
      },
      colors: {
        "brown": {
          50: "#F3F0ED",
          100: "#E9E3DD",
          200: "#D2C7BC",
          300: "#BCAB9A",
          400: "#A58F78",
          500: "#89725B",
          600: "#6E5C49",
          700: "#534537",
          800: "#372E25",
          900: "#1C1712",
          950: "#0C0A08"
        }
      }
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

