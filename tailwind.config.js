const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue,
      purple: colors.purple,
      green: colors.green,
      red: colors.red,
    },
  },
  plugins: [],
  purge: {
    options: {
      safelist: ["bg-red-100", "bg-gray-100", "bg-green-100"],
    },
  },
};
