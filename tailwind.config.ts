import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;