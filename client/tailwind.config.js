/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {
      spacing: {
        "1/9": "11.1111%",
        "8/9": "88.8888%",
      },
    },
  },
  plugins: [require("preline/plugin")],
};
