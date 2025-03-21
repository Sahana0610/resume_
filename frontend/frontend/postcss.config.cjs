// postcss.config.cjs
const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "tailwindcss-animate": {}, // Ensure this is correctly registered
  },
};
