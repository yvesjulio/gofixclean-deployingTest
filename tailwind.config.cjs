/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brandGreen: "#25D366",
        brandOrange: "#FF6B35",
        brandDark: "#3E3E3E",
        brandGray: "#696969",
        brandWhite: "#FFFFFF",
        brandText: "#025E4C",
        brandYellow: "#F59E0B",
        brandGra: "#ECECEC",
      },
      animation: {
        forwardBackward: "forwardBackward 1.5s ease-in-out infinite",
      },
      keyframes: {
        forwardBackward: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" },
        },
      },
    },
  },
  plugins: [],
};
