const tailwindcss = require("tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background)",
        text: "var(--text)",
        border: "#e2e8f0",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
