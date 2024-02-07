/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff",
        inside: "inset 5px 5px 15px #d1d9e6, inset -5px -5px 15px #ffffff",

        "box-gradient": "linear-gradient(145deg, #e2e8ec, #ffffff);",
      },
    },
  },
  plugins: [
    require("flowbite/plugin"),
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
};
