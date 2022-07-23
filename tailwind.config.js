const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      accept: {
        [500]: "#4eba53",
        [700]: "#40a545",
      },
      accent: {
        [500]: "#ff4081",
        [700]: "#e6004e",
      },
      reconsider: "#ffc30e",
      red: "#f44336",
      gray: colors.gray,
      sky: colors.sky,
      indigo: colors.indigo,
    },
    extend: {
      width: {
        card: "375px",
      },
    },
  },
  plugins: [],
};
