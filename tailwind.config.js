/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['"Sofia Sans", sans-serif'],
        'header': ['"Paytone One", sans-serif']
      },
      backgroundImage: {
        'background-texture': "url('/gray-wall-textures-background.jpg')"
      }
    },
  },
  plugins: [],
}
