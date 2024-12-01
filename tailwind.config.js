/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: { max: "600px" },
      md: { min: "600px", max: "1250px" },
      lg: { min: "1250px" },
    },
    extend: {
      colors: {
        "main-blue": {
          50: "#effefd",
          100: "#c7fffb",
          200: "#90fff6",
          300: "#51f7f0",
          400: "#1de4e2",
          500: "#04c7c8",
          600: "#00adb2",
          700: "#057c80",
          800: "#0a6065",
          900: "#0d5154",
          950: "#002e33",
        },

        line: "#e6e7e8",
        disabled: "#9e9e9E",
        bgmain: "#fafafb",
        bgcolor: "#fafafa",
        menuactive: "#f1f1fa",
        menuhover: "#f1f1fa",
        inputfocus: "#5e5ec6",
        buttonclick: "#4341bb",
      },
      boxShadow: {
        dim: " 0 0 0 200vmax rgba(0, 0, 0, .3)",
      },
      transitionProperty: {
        navigator: "transform, width",
      },
    },
  },
  plugins: [],
};
