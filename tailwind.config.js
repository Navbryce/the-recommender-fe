const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          [100]: "#a0aade",
          [200]: "#7b88d1",
          [300]: "#5566c4",
          [500]: "#3f51b5",
          [700]: "#2e3b84",
          [900]: "#141939",
        },
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
      },
      width: {
        card: "375px",
      },
    },
  },
  plugins: [],
};
