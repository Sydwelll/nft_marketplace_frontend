import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#26a5a1",
        secondary: "#6cb9c9",
        customDark: "#202020",
        "excel-green": "#008000",
        //primary: '#bd276a'
        // colors: ['#efd807', '#bd276a'], // Adjust colors to your school colors
        brown: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#bfa094",
          600: "#a18072",
          700: "#977669",
          800: "#846358",
          900: "#43302b",
        },
      },
      fontSize: {
        "2xs": ".6875rem",
      },
      fontFamily: {
        sans: "var(--font-inter)",
        display: "var(--font-mona-sans)",
      },
      opacity: {
        2.5: "0.025",
        7.5: "0.075",
        15: "0.15",
      },
      gradientColorStops: (theme) => ({
        black: "#000000", // Make sure the key name is 'black' if you're using from-black
      }),
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
export default config;
