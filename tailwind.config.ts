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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#26a5a1",
        secondary: "#6cb9c9",
        //primary: '#bd276a',
        // colors: ['#efd807', '#bd276a'], // Adjust colors to your school colors
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
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
