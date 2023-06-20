/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      black: "#121212",
      cyan: "#3DEFE9",
      green: "#6BD968",
      yellow: "#FECC1B",
      white: "#FFFFFF",
      "light-gray": "#C8C8C8",
      "dark-gray": "#383838",
      red: "#F44250",
      purple: "#D83BD2",
      primary: "#3992FF",
      "primary-hover": "#1B6EF5",
      transparent: "rgba(0, 0, 0, 0.5)",
    },
  },
  plugins: [],
};
