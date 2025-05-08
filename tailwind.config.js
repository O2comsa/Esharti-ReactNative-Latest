/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/features/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBMPlex"'],
      },
      padding: {
        layout: "18px",
      },
      margin: {
        layout: "18px",
      },
      colors: {
        primary: "#FEC432",
      },
    },
  },
  plugins: [],
};
