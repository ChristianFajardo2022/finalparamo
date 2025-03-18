/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "600px",
        xs: "300px",
      },
      fontFamily: {
        PPMori: ["PPMori-Regular", "serif"],
        Amenti: ["Amenti-VF","serif"],
        Tusker: ["Tusker-bold", "serif"],
        Manrope: ["Manrope", "serif"]
      },
    },
  },
  plugins: [],
};
