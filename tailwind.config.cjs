/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1440px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

module.exports = config;
