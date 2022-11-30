/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primario: '#8a85ed',
        secundario: '#ced2f5',
        oscuro: '#086e7d',
      },
      fontFamily: {
        MaterialIcons: ['"Material Icons"'],
      },
    },
  },
  plugins: [],
};
