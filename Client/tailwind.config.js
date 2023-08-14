/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}



module.exports = {
  content: [
    'node_modules/preline/dist/*.js',
  ],
  plugins: [
    require('preline/plugin'),
  ],
}